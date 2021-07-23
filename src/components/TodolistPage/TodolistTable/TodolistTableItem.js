/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// script
import { React, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import IconTodolistPages from '../../../styles/TodolistPage/IconTodolistPage';

// styling
import {
  StyledIcon2Search,
  StyledTodolistTableItem,
} from '../../../styles/TodolistPage/TodolistTable/StyledTodolistTableItemComps';

const TodolistTableItem = ({
  // eslint-disable-next-line no-unused-vars
  tableItemButtonState,
  handleIcon2SearchClick,
  listItemData,
  handleTableItemClick,
  isCurrentList,
  handleTableItemSelectButton,
  listId,
}) => {
  // console.log('tableItemButtonState: ', tableItemButtonState);
  const isTableItemSelected = useRef(0);
  const uptimeTime = listItemData.data().updateTime.toDate();
  const productItems = listItemData.data().items;
  const getTodolistTableItemSpan = (itemArray) => {
    if (!itemArray) {
      return;
    }
    let itemString = '';
    itemArray.forEach((srcValue, index) => {
      const value = srcValue.name;
      if (index === 0) {
        itemString += value;
        return;
      }
      itemString += `、${value}`;
    });

    // eslint-disable-next-line consistent-return
    return itemString;
  };

  const handleClick = (value) => {
    // console.log('trigger handleClick of TodolistTableItem.');
    // console.log('props.key: ', props.key);
    handleTableItemClick(value);
  };

  useEffect(() => {
    if (tableItemButtonState !== 4 && tableItemButtonState !== 5) {
      isTableItemSelected.current = 0;
    }
  }, [tableItemButtonState]);

  return (
    <StyledTodolistTableItem
      className={isCurrentList ? 'currentList' : ''}
      isCurrentList={isCurrentList}
      tableItemButtonState={tableItemButtonState}
    >
      <div
        className={`${
          tableItemButtonState !== 4 && tableItemButtonState !== 5
            ? 'selectTableItemButton dp-none'
            : 'selectTableItemButton'
        }`}
        onClick={() => {
          handleTableItemSelectButton(isTableItemSelected.current, listId);
          if (isTableItemSelected.current === 0) {
            isTableItemSelected.current = 1;
          } else {
            isTableItemSelected.current = 0;
          }
        }}
      >
        <div className="outline" />
        <div className="fill" />
      </div>
      <div
        className="content"
        onClick={() => {
          handleClick(listItemData);
        }}
      >
        <h2>{`${uptimeTime.getFullYear()}/${String(uptimeTime.getMonth()).padStart(
          2,
          '0',
        )}/${String(uptimeTime.getDate()).padStart(2, '0')}`}</h2>
        <p>{getTodolistTableItemSpan(productItems)}</p>
      </div>
      <StyledIcon2Search disabled={false}>
        <Link
          to="/search"
          onClick={() => {
            handleIcon2SearchClick(productItems, 1);
          }}
        >
          <p type="button" className="textIcon">
            輕鬆選
          </p>
          <IconTodolistPages.ChevronRight />
        </Link>
      </StyledIcon2Search>
    </StyledTodolistTableItem>
  );
};

export default TodolistTableItem;
