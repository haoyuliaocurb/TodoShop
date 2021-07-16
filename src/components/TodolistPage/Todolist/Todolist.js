// import { React } from 'react';
// import { StyledTodolist } from '../../../styles/TodolistPage/Todolist/StyledTodolistComps';

// const Todolist = () => {
//   return <StyledTodolist />;
// };

// export default Todolist;

// 以上將 <Todolist /> 簡易化以測試

// script
import { React, useState, useEffect, useRef, useCallback } from 'react';
// import { firestore } from '../../../utils/firebase/firebase-services';
import { useParams } from 'react-router-dom';

import IconTodolistPages from '../../../styles/TodolistPage/IconTodolistPage';

// styling
import {
  StyledTodolist,
  StyledTodolistItem,
  StyledTodolistInput,
} from '../../../styles/TodolistPage/Todolist/StyledTodolistComps';

const model = {
  flag: {
    enterEvent: false,
  },
};

const TodolistItem = ({ id, onItemClick, content }) => {
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

const Todolist = ({ currentListData, currentListId }) => {
  console.log('render Todolist.');
  // console.log('currentListId: ', currentListId);
  if (currentListData) {
    // console.log('currentListData.data(): ', currentListData.data());
  }
  const [TodolistItems, setTodolistItems] = useState([]);
  const [inputDisplayContent, setInputDisplayContent] = useState('');
  // const [ifClrTransparent, setIfClrTransparent] = useState(false);

  // console.log('isSignIn in Todolist: ', isSignIn);
  // console.log('currentListData in Todolist: ', currentListData);
  // console.log('currentListId in Todolist: ', currentListId);
  // TodolistItems
  const handleItemClick = (e) => {
    // console.log('trigger click event');
    const getItemkey = () => {
      const srcItemKey = e.currentTarget.id;
      // console.log('srcItemKey: ', srcItemKey);
      // let itemKeyPattern =  /-[0-9]*/i ;
      // let result = itemKeyPattern.exec('id-01');
      // console.log('result: ', result);

      return srcItemKey;
    };
    // TodolistItems[itemKey] = null;
    const itemKey = getItemkey();
    // console.log('itemKey: ', itemKey);

    // console.log('TodolistItems: ', TodolistItems);
    // let newItems = [...TodolistItems];
    // newItems.splice(itemKey, itemKey + 1);
    // console.log('newItems: ', newItems);

    setTodolistItems((oldItems) => {
      // console.log('oldItems.length: ', oldItems.length);

      const newItems = [];
      oldItems.forEach((value) => {
        // console.log('value.key: ', value.key);
        if (value.key !== itemKey) {
          newItems.push(value);
        }
      });
      // console.log('newItems: ', newItems);

      return newItems;
    });
    // console.log('TodolistItems: ', TodolistItems)
  };
  const itemCounter = useRef(-1);
  const createTodolistItem = (itemData) => {
    itemCounter.current += 1;
    // console.log('itemData.name: ', itemData.name, '; itemCounter.current: ', itemCounter.current);
    return (
      <TodolistItem
        id={`${itemCounter.current}`}
        key={`${itemCounter.current}`}
        content={itemData.name}
        onItemClick={handleItemClick}
      />
    );
  };
  const { listId } = useParams();
  const filterCurrentListData = useCallback(() => {
    console.log('Todolist: trigger filterCurrentListData');
    if (currentListData) {
      console.log('currentListData.data() in filterCurrentListData', currentListData.data());
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

    // console.log('currentListData: ', currentListData);
    const newTodolistItems = currentListData.data().items.map((value) => {
      // console.log('value: ', value);
      return createTodolistItem(value);
    });
    return newTodolistItems;
  }, [currentListData]);

  useEffect(() => {
    console.log('Todolist: useEffect depends on filterCurrentListData.');
    setTodolistItems(filterCurrentListData());
  }, [filterCurrentListData]);

  //   useEffect(() => {
  //     setTodolistItems(filterCurrentListData());
  //     // console.log('Todolist: useEffect depends on currentListData, currentListId.')
  //   }, [currentListData, currentListId, filterCurrentListData]);

  useEffect(() => {
    console.log('Todolist: useEffect depends on currentListData.');
  }, [currentListData]);

  useEffect(() => {
    console.log('Todolist: useEffect depends on TodolistItems.');
  }, [TodolistItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // handleInputKeyUp
  const handleInputKeyUp = (e) => {
    // console.log('keyDown: ', 'e.key: ', e.key, 'e.keyCode: ', e.keyCode);
    if (e.key === 'Enter') {
      if (inputDisplayContent === '') {
        return;
      }

      // console.log('trigger keydown 'enter' event');
      const inputValue = e.target.value;
      const newItems = TodolistItems.slice();
      newItems.push(
        createTodolistItem({
          name: inputValue,
        }),
      );
      // console.log('newItems: ', newItems);
      setTodolistItems(newItems);
      itemCounter.current += 1;
      e.target.value = '';
      setInputDisplayContent('');
      // console.log('e.target.value: ', e.target.value);
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

  return (
    <StyledTodolist>
      <form onSubmit={handleSubmit}>
        {TodolistItems}
        {/*
          <TodolistItem content='蘋果' onItemClick={handleItemClick} />
          <TodolistItem content='馬鈴薯' onItemClick={handleItemClick} />
          <TodolistItem content='橘子' onItemClick={handleItemClick} />
        */}
        <TodolistInput
          inputDisplayContent={inputDisplayContent}
          // ifClrTransparent={ifClrTransparent}
          onInputElInput={handleInputElInput}
          onInputKeyUp={handleInputKeyUp}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="input" />
        <div className="grid">
          <div />
          <div />
          <div />
        </div>
      </form>
    </StyledTodolist>
  );
};

export default Todolist;
