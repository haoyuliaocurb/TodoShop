/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// script
import { React } from 'react';
import { Link } from 'react-router-dom';
import IconTodolistPages from '../../../styles/TodolistPage/IconTodolistPage';

// styling
import {
  StyledIcon2Search,
  StyledTodolistTableItem,
} from '../../../styles/TodolistPage/TodolistTable/StyledTodolistTableItemComps';

const TodolistTableItem = ({
  handleIcon2SearchClick,
  listItemData,
  onTableItemClick,
  isCurrentList,
}) => {
  const uptimeTime = listItemData.data().updateTime.toDate();
  const productItems = listItemData.data().items;
  const getTodolistTableItemSpan = (itemArray) => {
    let itemString = '';
    itemArray.forEach((srcValue, index) => {
      const value = srcValue.name;
      if (index === 0) {
        itemString += value;
        return;
      }
      itemString += `、${value}`;
    });

    return itemString;
    /*
    return itemArray.map((value) => (
        <span key={`${encodeURI(value.name)}`}>{value.name}</span>
    ))
    */
  };

  const handleClick = (value) => {
    // console.log('trigger handleClick of TodolistTableItem.');
    // console.log('props.key: ', props.key);
    onTableItemClick(value);
  };

  return (
    <StyledTodolistTableItem
      className={isCurrentList ? 'currentList' : ''}
      isCurrentList={isCurrentList}
    >
      <div
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
