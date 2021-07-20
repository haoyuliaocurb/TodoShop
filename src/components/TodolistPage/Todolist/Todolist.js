import { React, useState, useEffect, useRef } from 'react';
// import { firestore } from '../../../utils/firebase/firebase-services';
import { useParams } from 'react-router-dom';

import IconTodolistPages from '../../../styles/TodolistPage/IconTodolistPage';

// styling
import {
  StyledTodolist,
  StyledTodolistItem,
  StyledTodolistInput,
} from '../../../styles/TodolistPage/Todolist/StyledTodolistComps';
import { firestore, firebase } from '../../../utils/firebase/firebase-services';

const model = {
  flag: {
    enterEvent: false,
  },
};

const TodolistItem = ({ id, onItemClick, content }) => {
  // console.log('ref: ', ref);
  return (
    <StyledTodolistItem id={id} onClick={onItemClick}>
      {content}
      <IconTodolistPages.Close />
    </StyledTodolistItem>
  );
};

const TodolistInput = ({ inputDisplayContent, onInputElInput, onInputKeyUp }) => {
  return (
    <StyledTodolistInput>
      <span>{inputDisplayContent}</span>
      <input
        type="text"
        id="input"
        // className={`${ifClrTransparent ? ' clr-transparent ' : ''}`}
        onInput={onInputElInput}
        onKeyUp={onInputKeyUp}
      />
    </StyledTodolistInput>
  );
};

// eslint-disable-next-line no-unused-vars
const maptodolistItemsContent = (todolistItemsContentValue) =>
  todolistItemsContentValue.map((itemContent) => ({ name: itemContent }));

const Todolist = ({
  getCurrentTodolistData,
  currentUid,
  // updateTodolistData,
  currentListData,
  // currentListIdx,
  handleTodolistClick,
}) => {
  console.log('render Todolist.');
  // console.log('currentListId: ', currentListId);
  const todolistItemsContent = useRef([]);
  const [inputDisplayContent, setInputDisplayContent] = useState('');
  const currentListId = !currentListData ? '' : currentListData.id;
  const decodedCurrentListData = !currentListData ? null : currentListData.data();
  const { listId } = useParams();
  const handleItemClick = (e) => {
    // console.log('trigger click event');
    const getItemkey = () => {
      const srcItemKey = e.currentTarget.id;
      return srcItemKey;
    };
    const itemKey = getItemkey();

    // console.log('itemKey: ', itemKey);
    // console.log('before: todolistItemsContent.current: ', todolistItemsContent.current);
    const newTodolistItemsContent = [];
    todolistItemsContent.current.forEach((value, index) => {
      console.log('index', index, 'index !== itemKey: ', index !== itemKey);
      if (index !== Number(itemKey)) {
        newTodolistItemsContent.push(value);
      }
    });
    todolistItemsContent.current = newTodolistItemsContent;
    // console.log('after: todolistItemsContent.current: ', todolistItemsContent.current);

    // 更新資料庫
    const newTodolistDataItemsPart = maptodolistItemsContent(todolistItemsContent.current);
    firestore
      .collection('todolists')
      .doc(listId)
      .update({
        items: newTodolistDataItemsPart,
        updateTime: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        console.log('successfully update todolist ', listId);
        getCurrentTodolistData(currentUid);
        // updateTodolistData(currentListId, currentListIdx);
      });
  };
  const createTodolistItem = (itemData, index) => {
    return (
      <TodolistItem
        id={index}
        key={`${itemData.name}${index}`}
        content={itemData.name}
        onItemClick={handleItemClick}
      />
    );
  };
  const getTodolistItems = (decodedCurrentListDataValue) => {
    console.log('Todolist: trigger getTodolistItems');
    if (!decodedCurrentListDataValue) {
      // console.log('currentListData is falsy.')
      return <div />;
    }

    if (listId !== currentListId) {
      // console.log('List id in url is not belong to current user.')
      // 防止直接輸入 listId 在 url 的情況
      // 可以做 redirect
      return <div />;
    }

    const todolistItems = decodedCurrentListData.items;
    if (!todolistItems) {
      todolistItemsContent.current = [];
      return <div />;
    }

    const newtodolistItemsContent = [];
    const newTodolistItems = todolistItems.map((value, index) => {
      const { name } = value;
      newtodolistItemsContent.push(name);

      return createTodolistItem(value, index);
    });
    todolistItemsContent.current = newtodolistItemsContent;
    // console.log('todolistItemsContent.current: ', todolistItemsContent.current);
    return newTodolistItems;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleInputKeyUp = (e) => {
    // console.log('keyDown: ', 'e.key: ', e.key, 'e.keyCode: ', e.keyCode);
    if (e.key === 'Enter') {
      if (inputDisplayContent === '') {
        return;
      }

      // console.log('trigger keydown 'enter' event');
      const inputValue = e.target.value;
      const newTodolistContent = [...todolistItemsContent.current];
      todolistItemsContent.current = newTodolistContent.concat([inputValue]);
      e.target.value = '';
      setInputDisplayContent('');

      // 更新資料庫
      const newTodolistDataItemsPart = maptodolistItemsContent(todolistItemsContent.current);
      firestore
        .collection('todolists')
        .doc(listId)
        .update({
          items: newTodolistDataItemsPart,
          updateTime: firebase.firestore.Timestamp.now(),
        })
        .then(() => {
          console.log('successfully update todolist ', listId);
          // updateTodolistData(currentListId, currentListIdx);
          getCurrentTodolistData(currentUid);
        });
    }
  };
  const handleInputElInput = (e) => {
    let { enterEvent } = model.flag;
    // console.log('trigger input event', 'enterEvent: ', enterEvent);

    if (enterEvent === false) {
      const inputValue = e.target.value;
      setInputDisplayContent(inputValue);
    } else {
      enterEvent = false;
      // console.log('enterEvent: ', enterEvent);
    }
  };
  const handleSelfClick = () => {
    handleTodolistClick();
  };

  useEffect(() => {
    console.log('Todolist: useEffect depends on currentListData.');
  }, [currentListData]);

  useEffect(() => {
    return () => {
      console.log('Todolist: unmount');
    };
  }, []);

  return (
    <StyledTodolist
      onClick={() => {
        handleSelfClick();
      }}
    >
      <form onSubmit={handleSubmit}>
        {getTodolistItems()}
        <TodolistInput
          inputDisplayContent={inputDisplayContent}
          // ifClrTransparent={ifClrTransparent}
          onInputElInput={handleInputElInput}
          onInputKeyUp={handleInputKeyUp}
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
