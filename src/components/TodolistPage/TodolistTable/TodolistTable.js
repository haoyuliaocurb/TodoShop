// script
import { React, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../../utils/firebase/firebase-services.js';
import TodolistTableItem from './TodolistTableItem';

// styling
import StyledTodolistTable from '../../../styles/TodolistPage/TodolistTable/StyledTodolistTable';

const TodolistTable = ({
  todolistData,
  currentTodolistInfo,
  currentUid,
  handleTableItemClick,
  handleIcon2SearchClick,
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

  useEffect(() => {
    // console.log('todolistData: ', todolistData);
    // console.log('TodolistTable: useEffect depends on todolistData.');
  }, [todolistData]);

  const getTodolistTableItem = (todolistDataValue, currentListIdx) => {
    return todolistDataValue.map((value, index) => {
      const updateTime = value.data().updateTime.toDate().valueOf();
      return (
        <TodolistTableItem
          key={`${updateTime}`}
          listItemData={value}
          handleTableItemClick={handleTableItemClick}
          handleIcon2SearchClick={handleIcon2SearchClick}
          isCurrentList={currentListIdx !== index ? false : currentTodolistInfo.itemButtonState}
        />
      );
    });
  };
  const getTodolistTableContent = () => {
    if (!currentUid) {
      return <p>請登入以瀏覽頁面</p>;
    }
    if (!todolistData) {
      return <p>無購物清單資料</p>;
    }
    return getTodolistTableItem(todolistData, currentTodolistInfo.idx);
  };

  return (
    <StyledTodolistTable>
      <div className="dividingLine" />
      {getTodolistTableContent()}
    </StyledTodolistTable>
  );
};

export default TodolistTable;
