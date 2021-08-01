/* eslint-disable no-unused-vars */
import { React, useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../../utils/firebase/firebase-services.js';
import TodolistTableItem from './TodolistTableItem';

import StyledTodolistTable from '../../../styles/TodolistPage/TodolistTable/StyledTodolistTable';

const TodolistTable = ({
  buttonState,
  todolistData,
  currentTodolistIdx,
  currentUid,
  handleTableItemClick,
  initTableItemsButtonState,
  handleTableItemSelectButton,
  handleTodolistTableScroll,
  readDBTodolistsData,
  pageAmount,
  isManageMode,
  isUpdateTodolistAfterSignIn,
  // deleteDBTodolistDate,
}) => {
  // console.log('<TodolistTable /> :render');
  // console.log(
  //   'todolistData: ',
  //   todolistData,
  //   'currentTodolistInfo: ',
  //   currentTodolistInfo,
  //   'currentUid: ',
  //   currentUid,
  // );
  const tableButtonState = !buttonState ? null : buttonState.todolistTable;
  const tableItemsButtonState = !tableButtonState ? null : tableButtonState.todolistTableItems;
  const tableItemButtonStateObj = {};
  // const isOnScroll = useRef(0);
  const container = useRef(null);
  const getTodolistTableItem = (todolistDataValue, currentTodolistIdxValue) => {
    const newTodolistTableItem = todolistDataValue.map((value, index) => {
      const listId = value.id;
      const updateTime = value.data().updateTime.toDate().valueOf();
      if (!isManageMode) {
        if (index === currentTodolistIdxValue) {
          tableItemButtonStateObj[listId] = 2;
        } else {
          tableItemButtonStateObj[listId] = 1;
        }
      } else {
        tableItemButtonStateObj[listId] = 4;
      }

      const tableItemButtonState = !tableItemsButtonState ? 0 : tableItemsButtonState[listId];
      return (
        <TodolistTableItem
          key={`${updateTime}`}
          listItemData={value}
          handleTableItemClick={handleTableItemClick}
          tableItemButtonState={tableItemButtonState}
          handleTableItemSelectButton={handleTableItemSelectButton}
          listId={listId}
          currentUid={currentUid}
        />
      );
    });
    return newTodolistTableItem;
  };
  const getTodolistTableContent = () => {
    // console.log('isUpdateTodolistAfterSignIn: ', isUpdateTodolistAfterSignIn);
    if (!currentUid || !isUpdateTodolistAfterSignIn) {
      return <p className="message">請登入以瀏覽所有購物清單</p>;
    }
    if (!todolistData) {
      return <p className="message">目前無購物清單</p>;
    }
    return getTodolistTableItem(todolistData, currentTodolistIdx);
  };

  useEffect(() => {
    initTableItemsButtonState(tableItemButtonStateObj);
  }, [todolistData]);

  return (
    <StyledTodolistTable>
      <div className="dividingLine" />
      <div
        className="container"
        ref={container}
        onScroll={() => {
          handleTodolistTableScroll(container.current);
        }}
      >
        {getTodolistTableContent()}
      </div>
    </StyledTodolistTable>
  );
};

export default TodolistTable;
