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
  updateTodolistData,
  currentListData,
  currentListIdx,
  currentListId,
  handleTodolistClick,
}) => {
  console.log('render Todolist.');
  // console.log('currentListId: ', currentListId);
  if (currentListData) {
    // console.log('currentListData.data(): ', currentListData.data());
  }
  const todolistItemsContent = useRef([]);
  const [inputDisplayContent, setInputDisplayContent] = useState('');
  const { listId } = useParams();

  // console.log('isSignIn in Todolist: ', isSignIn);
  // console.log('currentListData in Todolist: ', currentListData);
  // console.log('currentListId in Todolist: ', currentListId);
  // TodolistItems
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
        updateTodolistData(currentListId, currentListIdx);
      });
  };
  const createTodolistItem = (itemData, index) => {
    return (
      <TodolistItem
        id={index}
        key={itemData.name}
        content={itemData.name}
        onItemClick={handleItemClick}
      />
    );
  };
  const getTodolistItems = () => {
    // console.log('Todolist: trigger getTodolistItems');
    if (currentListData) {
      // console.log('currentListData.data() in getTodolistItems', currentListData.data());
    }
    if (!currentListData) {
      // console.log('currentListData is falsy.')
      return [];
    }

    if (listId !== currentListId) {
      // console.log('List id in url is not belong to current user.')
      // 防止直接輸入 listId 在 url 的情況
      // 可以做 redirect
      return [];
    }

    const newtodolistItemsContent = [];
    // console.log('currentListData: ', currentListData);
    const newTodolistItems = currentListData.data().items.map((value, index) => {
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
          updateTodolistData(currentListId, currentListIdx);
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
    // if (!currentListData) {
    //   return;
    // }
    console.log('updateTodolistData.current: ', updateTodolistData.current);
    console.log('toggle updateTodolistData.current: ', updateTodolistData.current);
    console.log('==========');
  }, [currentListData]);

  // console.log('====================');
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
