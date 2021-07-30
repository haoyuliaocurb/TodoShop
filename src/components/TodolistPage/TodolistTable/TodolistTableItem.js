/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { React, useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { firestore, firebase } from '../../../utils/firebase/firebase-services';
import IconTodolistPages from '../../../styles/TodolistPage/IconTodolistPage';

// styling
import {
  StyledIcon2Search,
  StyledTodolistTableItem,
} from '../../../styles/TodolistPage/TodolistTable/StyledTodolistTableItemComps';

const TodolistTableItem = ({
  // eslint-disable-next-line no-unused-vars
  tableItemButtonState,
  listItemData,
  handleTableItemClick,
  isCurrentList,
  handleTableItemSelectButton,
  listId,
  currentUid,
}) => {
  // console.log('tableItemButtonState: ', tableItemButtonState);
  const isTableItemSelected = useRef(0);
  const keywordsArray = useRef(null);
  const history = useHistory();
  const uptimeTime = listItemData.data().updateTime.toDate();
  const productItems = listItemData.data().items;
  const getTodolistTableItemSpan = (itemArray) => {
    if (!itemArray) {
      return;
    }
    let itemString = '';
    const newKeywordsArray = [];
    itemArray.forEach((srcValue, index) => {
      const value = srcValue.name;
      newKeywordsArray.push(value);
      if (index === 0) {
        itemString += value;
        return;
      }
      itemString += `、${value}`;
    });

    keywordsArray.current = newKeywordsArray;
    // eslint-disable-next-line consistent-return
    return itemString;
  };

  const handleClick = (value) => {
    // console.log('trigger handleClick of TodolistTableItem.');
    // console.log('props.key: ', props.key);
    handleTableItemClick(value);
  };
  const handleIcon2SearchClick = async (currentUidValue, keywordsValue, sourceValue) => {
    // console.log('trigger handleIcon2SearchClick');
    let keywordsStr = '';
    keywordsArray.current.forEach((keyword, index) => {
      if (index === 0) {
        keywordsStr += keyword;
        return;
      }
      keywordsStr += `+${keyword}`;
    });
    history.push(`/search?source=1&keywords=${keywordsStr}`);
    // await firestore.collection('users').doc(currentUidValue).collection('searchKeywordsLog').add({
    //   updateTime: firebase.firestore.Timestamp.now(),
    //   source: sourceValue,
    //   keywords: keywordsValue,
    // });
  };

  useEffect(() => {
    if (tableItemButtonState !== 4 && tableItemButtonState !== 5) {
      isTableItemSelected.current = 0;
    }
  }, [tableItemButtonState]);
  // useEffect(() => {
  //   console.log('keywordsArray.current: ', keywordsArray.current);
  // }, [keywordsArray.current]);

  return (
    <StyledTodolistTableItem
      className={isCurrentList ? 'todolistTableItem currentList' : 'todolistTableItem'}
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
          console.log('trigger TodolistItem onClick');
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
          onClick={(event) => {
            event.preventDefault();
            handleIcon2SearchClick(currentUid, productItems, 1);
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
