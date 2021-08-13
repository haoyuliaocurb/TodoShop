/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useRef } from 'react';
// import { firestore } from '../../../utils/firebase/firebase-services';
import { useParams } from 'react-router-dom';

import TodolistItem from './TodolistItem';
import TodolistInput from './TodolistInput';

import StyledTodolist from '../../../styles/TodolistPage/Todolist/StyledTodolist';
import { firestore, firebase } from '../../../utils/firebase/firebase-services';
import { getTimeKeyGenerator } from '../../../utils/selfLibrary';

const convertTodolistItemsContent = (todolistItemsContentValue) => {
  const todolistItemsContentArray = Object.keys(todolistItemsContentValue).map((itemKey) => {
    const name = todolistItemsContentValue[itemKey];
    return { name };
  });
  return todolistItemsContentArray;
};

const Todolist = ({
  currentTodolistData,
  handleTodolistClick,
  readDBTodolistsData,
  currentUid,
  updateDBTodolistData,
  // currentTodolistIdx,
  pageAmount,
  // currentListIdx,
  isUpdateTodolistAfterSignIn,
}) => {
  const todolistItemsContentObj = useRef({});
  const isKeyUpTriggered = useRef(0);
  // const preUpdatedTodolistItemContent = useRef(null);
  const [inputDisplayContent, setInputDisplayContent] = useState('');
  // const preTodolistId = useRef(null);
  const currentTodolistId = !currentTodolistData ? '' : currentTodolistData.id;
  // eslint-disable-next-line no-unused-vars
  const getDecodedCurrentTodolistData = () => {
    if (!currentUid) {
      if (!currentTodolistData) {
        return null;
      }
      return currentTodolistData;
    }
    // console.log('isUpdateTodolistAfterSignIn: ', isUpdateTodolistAfterSignIn);
    return !currentTodolistData || !isUpdateTodolistAfterSignIn ? null : currentTodolistData.data();
  };
  const decodedCurrentTodolistData = getDecodedCurrentTodolistData();
  const pathListId = useParams().listId;
  const getTimeKey = getTimeKeyGenerator();

  // console.log('currentTodolistData: ', currentTodolistData);
  // console.log('<Todolist />: render');
  // console.log('decodedCurrentTodolistData: ', decodedCurrentTodolistData);
  // console.log('todolistItemsContentObj.current: ', todolistItemsContentObj.current);

  const handleTodolistItemClick = (createTimeValue) => {
    // console.log('createTimeValue: ', createTimeValue);
    const preTodolistItemsContent = { ...todolistItemsContentObj.current };
    delete preTodolistItemsContent[createTimeValue];

    const newTodolistItemsContent = preTodolistItemsContent;
    todolistItemsContentObj.current = { ...newTodolistItemsContent };
    // console.log('todolistItemsContentObj.current: ', todolistItemsContentObj.current);

    // 更新資料庫、localStorage
    const newTodolistDataItems = convertTodolistItemsContent(newTodolistItemsContent);
    if (!currentUid) {
      const newLocalStorageTodolistData = [{ items: newTodolistDataItems }];
      window.localStorage.setItem('TodoShopTodolist', JSON.stringify(newLocalStorageTodolistData));
      readDBTodolistsData();
      return;
    }
    const newTodolistDataPart = {
      items: newTodolistDataItems,
      updateTime: firebase.firestore.Timestamp.now(),
    };
    updateDBTodolistData(pathListId, newTodolistDataPart, currentUid, pageAmount);
  };
  const getTodolistItems = (decodedCurrentTodolistDataValue) => {
    // console.log('<Todolist />: trigger getTodolistItems');
    if (!decodedCurrentTodolistDataValue) {
      // console.log('conditional: !decodedCurrentTodolistDataValue');
      return <div />;
    }
    if (pathListId !== currentTodolistId) {
      // console.log('<Todolist />: Warning: List id in url is not belong to current user.')
      // 防止直接輸入 pathListId 在 url 的情況
      // 可以做 redirect
      return <div />;
    }

    const createTodolistItem = (todolistItemData, createTimeValue) => {
      const { name } = todolistItemData;
      return (
        <TodolistItem
          key={createTimeValue}
          content={name}
          handleTodolistItemClick={() => {
            handleTodolistItemClick(createTimeValue);
          }}
        />
      );
    };
    const todolistDataItems = decodedCurrentTodolistData.items;
    if (!todolistDataItems) {
      todolistItemsContentObj.current = {};
      return <div />;
    }

    const newTodolistItemsContent = {};
    const newTodolistItems = todolistDataItems.map((todolistDataItemValue) => {
      const { name } = todolistDataItemValue;
      const createTimeValue = getTimeKey();
      newTodolistItemsContent[createTimeValue] = name;

      return createTodolistItem(todolistDataItemValue, createTimeValue);
    });
    // console.log('newTodolistItemsContent: ', newTodolistItemsContent);
    todolistItemsContentObj.current = newTodolistItemsContent;
    // console.log('todolistItemsContentObj.current: ', todolistItemsContentObj.current);
    return newTodolistItems;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleTodolistInputKeyUp = (e) => {
    // console.log('trigger handleTodolistInputKeyUp');
    // console.log('isKeyUpTriggered.current: ', isKeyUpTriggered.current);
    // console.log('e: ', e);
    if (e.key !== 'Enter') {
      return;
    }
    if (inputDisplayContent === '') {
      return;
    }
    isKeyUpTriggered.current = 1;

    // console.log('inputDisplayContent: ', inputDisplayContent);
    const inputValue = e.target.value;
    // preUpdatedTodolistItemContent.current = inputValue;
    setInputDisplayContent('');
    const createTimeValue = getTimeKey();
    const newTodolistItemsContent = { ...todolistItemsContentObj.current };
    newTodolistItemsContent[createTimeValue] = inputValue;

    // 更新資料庫、localStorage
    const newTodolistDataItems = convertTodolistItemsContent(newTodolistItemsContent);
    if (!currentUid) {
      const newLocalStorageTodolistData = [{ items: newTodolistDataItems }];
      window.localStorage.setItem('TodoShopTodolist', JSON.stringify(newLocalStorageTodolistData));
      readDBTodolistsData();
      return;
    }

    firestore
      .collection('todolists')
      .doc(pathListId)
      .update({
        items: newTodolistDataItems,
        updateTime: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        // console.log(
        //   '<Todolist />: handleTodolistInputKeyUp: successfully update DB todolists doc ',
        //   pathListId,
        // );

        console.log('readDBTodolistsData: ', readDBTodolistsData);
        readDBTodolistsData(currentUid, pageAmount);
        isKeyUpTriggered.current = 0;
      });
  };
  const handleTodolistInputInput = (e) => {
    if (isKeyUpTriggered.current === 1) {
      isKeyUpTriggered.current = 0;
    }
    const inputValue = e.target.value;

    // if (preUpdatedTodolistItemContent.current === null) {
    //   setInputDisplayContent(inputValue);
    //   return;
    // }

    // const encodedInputValue = encodeURIComponent(inputValue);
    // const encodedPreUpdatedTodolistItemContent = encodeURIComponent(
    //   preUpdatedTodolistItemContent.current,
    // );
    // const testInputValuePattern = new RegExp(`^${encodedPreUpdatedTodolistItemContent}`);
    // console.log('encodedPreUpdatedTodolistItemContent: ', encodedPreUpdatedTodolistItemContent);
    // if (testInputValuePattern.test(encodedInputValue)) {
    //   console.log('true');
    //   const inputValueCharArray = inputValue.split('');
    //   const sliceStartIdx = preUpdatedTodolistItemContent.current.split('').length;
    //   const correctedInputValue = inputValueCharArray.slice(sliceStartIdx).join('');
    //   setInputDisplayContent(correctedInputValue);
    //   return;
    // }
    setInputDisplayContent(inputValue);
  };

  const getGrid = () => {
    const getTimeKeyForGrid = getTimeKeyGenerator();
    const grid = Array.from({ length: 12 }).map(() => {
      return <div key={getTimeKeyForGrid()} />;
    });
    return grid;
  };
  return (
    <StyledTodolist onClick={handleTodolistClick}>
      <form onSubmit={handleSubmit}>
        {getTodolistItems(decodedCurrentTodolistData)}
        <TodolistInput
          inputDisplayContent={inputDisplayContent}
          // ifClrTransparent={ifClrTransparent}
          handleTodolistInputInput={handleTodolistInputInput}
          handleTodolistInputKeyUp={handleTodolistInputKeyUp}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="input" />
        <div className="grid">{getGrid()}</div>
      </form>
    </StyledTodolist>
  );
};

export default Todolist;
