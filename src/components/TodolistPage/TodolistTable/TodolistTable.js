// script
import { React, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../../utils/firebase/firebase-services.js';
import TodolistTableItem from './TodolistTableItem';

// styling
import StyledTodolistTable from '../../../styles/TodolistPage/TodolistTable/StyledTodolistTable';

const TodolistTable = ({ isSignIn, todolistData, currentListInfo, onTableItemClick }) => {
  // console.log('render TodolistTable.');

  useEffect(() => {
    // console.log('todolistData: ', todolistData);
    // console.log('TodolistTable: useEffect depends on todolistData.');
  }, [todolistData]);

  const getTodolistTableItem = (dataArray, currentListIdx) => {
    return dataArray.map((value, index) => {
      const updateTime = value.data().updateTime.toDate().valueOf();
      // console.log('updateTime: ', updateTime);
      return (
        <TodolistTableItem
          key={`${updateTime}`}
          listItemData={value}
          onTableItemClick={onTableItemClick}
          // eslint-disable-next-line no-unneeded-ternary
          isCurrentList={currentListIdx === index ? currentListInfo.itemButtonState : false}
        />
      );
    });
  };

  const getTodolistTableContent = () => {
    if (!isSignIn) {
      return <p>請登入以瀏覽頁面</p>;
    }
    if (!todolistData) {
      return <p>無購物清單資料</p>;
    }
    return getTodolistTableItem(todolistData, currentListInfo.idx);
  };

  return (
    <StyledTodolistTable>
      <div className="dividingLine" />
      {getTodolistTableContent()}
    </StyledTodolistTable>
  );
};

export default TodolistTable;
