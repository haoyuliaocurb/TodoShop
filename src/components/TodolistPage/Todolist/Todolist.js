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
const mapTodolistItemsContent = (todolistItemsContentValue) =>
  todolistItemsContentValue.map((itemContent) => ({ name: itemContent }));

const Todolist = ({
  // handleTodolistInputKeyUp,
  handleTodolistItemClick,
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
  const TodolistItemsContent = useRef([]);
  const [TodolistItems, setTodolistItems] = useState([]);
  const [inputDisplayContent, setInputDisplayContent] = useState('');
  const updateTodolistData = useRef(false);
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
    setTodolistItems((oldItems) => {
      const newItems = [];
      const newItemsContent = [];
      oldItems.forEach((value) => {
        // console.log('value.key: ', value.key);
        if (value.key !== itemKey) {
          newItemsContent.push(value.props.content);
          newItems.push(value);
        }
      });
      // console.log('newItems: ', newItems);
      TodolistItemsContent.current = newItemsContent;
      // console.log('TodolistItemsContent.current: ', TodolistItemsContent.current);

      return newItems;
    });

    console.log('updateTodolistData.current: ', updateTodolistData.current);
    updateTodolistData.current = true;
    console.log('toggle updateTodolistData.current: ', updateTodolistData.current);
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
  const filterCurrentListData = useCallback(() => {
    // console.log('Todolist: trigger filterCurrentListData');
    if (currentListData) {
      // console.log('currentListData.data() in filterCurrentListData', currentListData.data());
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

    const newTodolistItemsContent = [];
    // console.log('currentListData: ', currentListData);
    const newTodolistItems = currentListData.data().items.map((value) => {
      // console.log('value: ', value);
      const { name } = value;
      newTodolistItemsContent.push(name);

      return createTodolistItem(value);
    });
    TodolistItemsContent.current = newTodolistItemsContent;
    // console.log('TodolistItemsContent.current: ', TodolistItemsContent.current);
    return newTodolistItems;
  }, [currentListData]);

  useEffect(() => {
    // console.log('Todolist: useEffect depends on filterCurrentListData.');
    setTodolistItems(filterCurrentListData());
  }, [filterCurrentListData]);

  //   useEffect(() => {
  //     setTodolistItems(filterCurrentListData());
  //     // console.log('Todolist: useEffect depends on currentListData, currentListId.')
  //   }, [currentListData, currentListId, filterCurrentListData]);

  useEffect(() => {
    console.log('Todolist: useEffect depends on currentListData.');
    // if (!currentListData) {
    //   return;
    // }
    console.log('updateTodolistData.current: ', updateTodolistData.current);
    updateTodolistData.current = false;
    console.log('toggle updateTodolistData.current: ', updateTodolistData.current);
    console.log('==========');
  }, [currentListData]);

  useEffect(() => {
    console.log('Todolist: useEffect depends on TodolistItems.');
    console.log('updateTodolistData.current: ', updateTodolistData.current);
    if (!updateTodolistData.current) {
      return;
    }

    // 更新資料庫
    const newTodolistDataItemsPart = mapTodolistItemsContent(TodolistItemsContent.current);
    firestore
      .collection('todolists')
      .doc(listId)
      .update({
        items: newTodolistDataItemsPart,
        updateTime: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        console.log('successfully update todolist ', listId);
      });

    // setTodolistData
    handleTodolistItemClick(currentListId, currentListIdx);
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
      TodolistItemsContent.current.push(inputValue);
      // console.log('TodolistItemsContent.current: ', TodolistItemsContent.current);
      setTodolistItems(newItems);
      itemCounter.current += 1;
      e.target.value = '';
      setInputDisplayContent('');

      // // 更新資料庫
      // const newTodolistDataItemsPart = mapTodolistItemsContent(TodolistItemsContent.current);
      // firestore
      //   .collection('todolists')
      //   .doc(listId)
      //   .update({
      //     items: newTodolistDataItemsPart,
      //     updateTime: firebase.firestore.Timestamp.now(),
      //   })
      //   .then(() => {
      //     console.log('successfully update todolist ', listId);
      //   });
      // // setTodolistData
      // // handleTodolistInputKeyUp(currentListId, currentListIdx);

      console.log('updateTodolistData.current: ', updateTodolistData.current);
      updateTodolistData.current = true;
      console.log('toggle updateTodolistData.current: ', updateTodolistData.current);
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

  console.log('====================');
  return (
    <StyledTodolist
      onClick={() => {
        handleSelfClick();
      }}
    >
      <form onSubmit={handleSubmit}>
        {TodolistItems}
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
