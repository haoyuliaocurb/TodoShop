import { React, useState, useEffect, useRef } from 'react';
// import { firestore } from '../../../utils/firebase/firebase-services';
import { useParams } from 'react-router-dom';

import TodolistItem from './TodolistItem';
import TodolistInput from './TodolistInput';

import StyledTodolist from '../../../styles/TodolistPage/Todolist/StyledTodolist';
import { firestore, firebase } from '../../../utils/firebase/firebase-services';

const convertTodolistItemsContent = (todolistItemsContentValue) => {
  const todolistItemsContentArray = todolistItemsContentValue.keys().map((itemKey) => {
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
  // updateTodolistData,
  // currentListIdx,
}) => {
  // console.log('<Todolist />: render');

  const todolistItemsContent = useRef({});
  const isKeyUpTriggered = useRef(false);
  const [inputDisplayContent, setInputDisplayContent] = useState('');
  const currentTodolistId = !currentTodolistData ? '' : currentTodolistData.id;
  const decodedCurrentTodolistData = !currentTodolistData ? null : currentTodolistData.data();
  const pathListId = useParams().listId;

  const handleTodolistItemClick = (createTimeValue) => {
    const preTodolistItemsContent = { ...todolistItemsContent.current };
    delete preTodolistItemsContent[createTimeValue];

    const newTodolistItemsContent = preTodolistItemsContent;
    todolistItemsContent.current = { ...newTodolistItemsContent };

    // 更新資料庫
    const newTodolistDataItems = convertTodolistItemsContent(newTodolistItemsContent);
    firestore
      .collection('todolists')
      .doc(pathListId)
      .update({
        items: newTodolistDataItems,
        updateTime: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        console.log(
          '<Todolist />: handleTodolistItemClick: successfully update DB todolists doc ',
          pathListId,
        );

        readDBTodolistsData(currentUid);
      });
  };
  const getTodolistItems = (decodedCurrentTodolistDataValue) => {
    // console.log('<Todolist />: trigger getTodolistItems');
    if (!decodedCurrentTodolistDataValue) {
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
      todolistItemsContent.current = {};
      return <div />;
    }

    const newTodolistItemsContent = {};
    const newTodolistItems = todolistDataItems.map((todolistDataItemValue) => {
      const { name } = todolistDataItemValue;
      const createTimeValue = Date.now();
      newTodolistItemsContent[createTimeValue] = name;

      return createTodolistItem(todolistDataItemValue, createTimeValue);
    });
    todolistItemsContent.current = newTodolistItemsContent;
    // console.log('todolistItemsContent.current: ', todolistItemsContent.current);
    return newTodolistItems;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleTodolistInputKeyUp = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    if (inputDisplayContent === '') {
      return;
    }

    // console.log('trigger keydown 'enter' event');
    const inputValue = e.target.value;
    setInputDisplayContent('');
    const createTimeValue = Date.now();
    const newTodolistItemsContent = { ...todolistItemsContent.current };
    newTodolistItemsContent[createTimeValue] = inputValue;

    // 更新資料庫
    const newTodolistDataItems = convertTodolistItemsContent(newTodolistItemsContent);
    firestore
      .collection('todolists')
      .doc(pathListId)
      .update({
        items: newTodolistDataItems,
        updateTime: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        console.log(
          '<Todolist />: handleTodolistInputKeyUp: successfully update DB todolists doc ',
          pathListId,
        );

        readDBTodolistsData(currentUid);
      });
  };
  const handleTodolistInputInput = (e) => {
    if (isKeyUpTriggered.current === false) {
      const inputValue = e.target.value;
      setInputDisplayContent(inputValue);
    } else {
      isKeyUpTriggered.current = false;
    }
  };

  useEffect(() => {
    console.log('<Todolist />: useEffect depends on currentTodolistData');
    console.log('currentTodolistData: ', currentTodolistData);
    todolistItemsContent.current = {};
  }, [currentTodolistData]);

  useEffect(() => {
    return () => {
      // console.log('<Todolist />: unmount');
    };
  }, []);

  return (
    <StyledTodolist onClick={handleTodolistClick}>
      <form onSubmit={handleSubmit}>
        {getTodolistItems()}
        <TodolistInput
          inputDisplayContent={inputDisplayContent}
          // ifClrTransparent={ifClrTransparent}
          handleTodolistInputInput={handleTodolistInputInput}
          handleTodolistInputKeyUp={handleTodolistInputKeyUp}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="input" />
        <div className="grid">
          {Array.from({ length: 12 }).map(() => (
            <div />
          ))}
        </div>
      </form>
    </StyledTodolist>
  );
};

export default Todolist;
