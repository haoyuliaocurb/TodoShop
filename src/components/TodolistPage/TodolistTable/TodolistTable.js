import { React, useEffect } from 'react';
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
  handleIcon2SearchClick,
  initTableItemsButtonState,
  handleTableItemSelectButton,
  // pageAmount,
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
  const getTodolistTableItem = (todolistDataValue, currentTodolistIdxValue) => {
    const newTodolistTableItem = todolistDataValue.map((value, index) => {
      const listId = value.id;
      const updateTime = value.data().updateTime.toDate().valueOf();
      if (index === currentTodolistIdxValue) {
        tableItemButtonStateObj[listId] = 2;
      } else {
        tableItemButtonStateObj[listId] = 1;
      }
      const tableItemButtonState = !tableItemsButtonState ? 0 : tableItemsButtonState[listId];
      return (
        <TodolistTableItem
          key={`${updateTime}`}
          listItemData={value}
          handleTableItemClick={handleTableItemClick}
          handleIcon2SearchClick={handleIcon2SearchClick}
          tableItemButtonState={tableItemButtonState}
          handleTableItemSelectButton={handleTableItemSelectButton}
          listId={listId}
        />
      );
    });
    return newTodolistTableItem;
  };
  const getTodolistTableContent = () => {
    if (!currentUid) {
      return <p>請登入以瀏覽頁面</p>;
    }
    if (!todolistData) {
      return <p>無購物清單資料</p>;
    }
    return getTodolistTableItem(todolistData, currentTodolistIdx);
  };

  useEffect(() => {
    // console.log('todolistData: ', todolistData);
    // console.log('TodolistTable: useEffect depends on todolistData.');
  }, [todolistData]);
  useEffect(() => {
    initTableItemsButtonState(tableItemButtonStateObj);
  }, []);

  return (
    <StyledTodolistTable>
      <div className="dividingLine" />
      {getTodolistTableContent()}
    </StyledTodolistTable>
  );
};

export default TodolistTable;
