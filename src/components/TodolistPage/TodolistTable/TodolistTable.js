// script
import { React, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../../utils/firebase/firebase-services.js';
import TodolistTableItem from './TodolistTableItem';

// styling
import StyledTodolistTable from '../../../styles/TodolistPage/TodolistTable/StyledTodolistTable';

/*
let data = [
    {
        name: 'A',
        updateTime: '2020/01/28',
        items: [
            {
                name: '洗髮精',
            },
            {
                name: '橘子'
            },
            {
                name: '蘋果',
            },
        ]
    },
    {
        name: 'B',
        updateTime: '2019/01/28',
        items: [
            {
                name: '衛生紙',
            },
            {
                name: '凡士林'
            },
            {
                name: '衛生紙',
            },
        ]
    }
]
*/

const TodolistTable = ({ isSignIn, srcTodolistData, onTableItemClick }) => {
  const [todolistData, setTodolistData] = useState(null);
  // console.log('render TodolistTable.');

  useEffect(() => {
    // console.log('srcTodolistData: ', srcTodolistData);
    setTodolistData(srcTodolistData);
    // console.log('TodolistTable: useEffect depends on srcTodolistData.');
  }, [srcTodolistData]);

  useEffect(() => {
    // console.log('todolistData: ', todolistData);
    // console.log('TodolistTable: useEffect depends on todolistData.');
  }, [todolistData]);

  const getTodolistTableItem = (itemArray) => {
    return itemArray.map((value) => {
      const updateTime = value.data().updateTime.toDate().valueOf();
      // console.log('updateTime: ', updateTime);
      return (
        <TodolistTableItem
          key={`${updateTime}`}
          listItemData={value}
          onTableItemClick={onTableItemClick}
        />
      );
    });
  };

  const getTodolistTableContent = () => {
    if (!todolistData) {
      return '';
    }
    if (!isSignIn) {
      return <p>請登入以瀏覽頁面</p>;
    }
    return getTodolistTableItem(todolistData);
  };

  return (
    <StyledTodolistTable>
      <div className="dividingLine" />
      {getTodolistTableContent()}
    </StyledTodolistTable>
  );
};

export default TodolistTable;
