// script
import { React, useState, useEffect, useRef } from 'react';
import { Route, Redirect, Switch, useHistory, useLocation } from 'react-router-dom';
import { firestore } from '../utils/firebase/firebase-services';
import Todolist from '../components/TodolistPage/Todolist/Todolist';
import TodolistTable from '../components/TodolistPage/TodolistTable/TodolistTable';
import { styledVariables } from '../styles/app/cssMaterial';

// styling
import StyledTodolistPage from '../styles/TodolistPage/StyledTodolistPage';

const TodolistPages = ({ windowWidth, isSignIn }) => {
  // console.log('render TodolistPages');

  const { breakpoint } = styledVariables.todolistPages;
  const currentUid = isSignIn;
  // console.log('isSignIn when rendering TodolistPages: ', isSignIn);

  // 處理 todolistData
  const [todolistData, setTodolistData] = useState([]);
  const srcCurrentListId = useRef('');
  const currentListData = useRef(null);
  const [currentListId, setCurrentListId] = useState('');

  const getCurrentTodolistData = async () => {
    // eslint-disable-next-line consistent-return
    const promiseReturned = new Promise((resolve) => {
      if (!isSignIn) {
        return [];
      }
      // console.log('currentUser.uid: ', currentUser.uid);
      const newTodolistData = [];
      let fetchedNewTodolistDataCounter = 0;
      firestore
        .collection('todolist')
        .where('uid', '==', currentUid)
        .orderBy('updateTime', 'desc')
        .limit(15)
        .get()
        .then((fetchedNewTodolistData) => {
          // console.log('fetchedNewTodolistData: ', fetchedNewTodolistData);
          // console.log('trigger QuerySnapshot .then');
          fetchedNewTodolistData.forEach((value) => {
            // console.log('element of TodolistData');
            // console.log('value: ', value);
            if (fetchedNewTodolistDataCounter === 0) {
              // updateTime 最新者的 doc name 為 currrentId
              srcCurrentListId.current = value.id;
              currentListData.current = value;
              // console.log('srcCurrentListId: ', srcCurrentListId);
            }
            newTodolistData.push(value);
            // console.log('newTodolistData: ', newTodolistData);
            fetchedNewTodolistDataCounter += 1;
          });
        });
      resolve(newTodolistData);
    });
    return promiseReturned;
  };

  useEffect(() => {
    const fetchTodolistData = async () => {
      // 登入狀態改變時，也會重新 setTodolistData
      const newTodolistData = await getCurrentTodolistData();
      setTodolistData(newTodolistData);
      // console.log('useEffect depends on isSignIn');
    };
    fetchTodolistData();
  }, [isSignIn]);

  useEffect(() => {
    // 當 todolistData 更改，便會更改 currentListId
    const getCurrentListId = () => srcCurrentListId.current;
    setCurrentListId(getCurrentListId());
    // console.log('todolistData: ', todolistData);
    // console.log('srcCurrentListId.current: ', srcCurrentListId.current);
    // console.log('useEffect depends on todolistData');
  }, [todolistData]);

  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    console.log('useEffect depends on currentListId');
    // console.log('currentListData.current: ', currentListData.current);
    // console.log('currentListId: ', currentListId);
    // console.log('----------');
    const pathArray = location.pathname.split('/');
    if (pathArray.some((value) => value === 'id')) {
      const listId = pathArray[pathArray.length - 1];
      if (listId === '') {
        return;
      }

      if (listId !== currentListId) {
        history.push(`/todolist`);
      }
    }
  }, [currentListId]);

  const handleTableItemClick = (value) => {
    console.log('TableItem onClick: begin to setCurrentListId');
    currentListData.current = value;
    setCurrentListId(value.id);
  };

  // eslint-disable-next-line consistent-return
  const getTodolistPageContent = () => {
    if (!isSignIn && windowWidth <= breakpoint) {
      // 判斷登入與否
      return (
        <Switch>
          <Route path="/todolist/table">
            <TodolistTable isSignIn={false} />
          </Route>
          <Route exact path="/todolist/id/">
            <Todolist isSignIn={false} />
          </Route>
          <Redirect from="/todolist" to="/todolist/id/" />
        </Switch>
      );
    }
    if (!isSignIn && !(windowWidth <= breakpoint)) {
      return (
        <Switch>
          <Route exact path="/todolist/id/">
            <TodolistTable isSignIn={false} />
            <Todolist isSignIn={false} />
          </Route>
          <Redirect from="/todolist" to="/todolist/id/" />
        </Switch>
      );
    }
    if (isSignIn && windowWidth <= breakpoint) {
      return (
        <Switch>
          <Route exact path="/todolist/id/:listId">
            <Todolist
              // eslint-disable-next-line react/jsx-boolean-value
              isSignIn={true}
              currentListData={currentListData.current}
              currentListId={currentListId}
            />
          </Route>
          <Route exact path="/todolist/table">
            <TodolistTable
              onTableItemClick={handleTableItemClick}
              // eslint-disable-next-line react/jsx-boolean-value
              isSignIn={true}
              srcTodolistData={todolistData}
            />
          </Route>
          <Redirect from="/todolist" to={`/todolist/id/${currentListId}`} />
        </Switch>
      );
    }
    if (isSignIn && !(windowWidth <= breakpoint)) {
      return (
        <Switch>
          <Route path="/todolist/id/:listId">
            <TodolistTable
              onTableItemClick={handleTableItemClick}
              // eslint-disable-next-line react/jsx-boolean-value
              isSignIn={true}
              srcTodolistData={todolistData}
            />
            <Todolist
              // eslint-disable-next-line react/jsx-boolean-value
              isSignIn={true}
              currentListData={currentListData.current}
              currentListId={currentListId}
            />
          </Route>
          <Redirect from="/todolist/table" to={`/todolist/id/${currentListId}`} />
          <Redirect from="/todolist" to={`/todolist/id/${currentListId}`} />
        </Switch>
      );
    }
  };

  return <StyledTodolistPage>{getTodolistPageContent()}</StyledTodolistPage>;
};

export default TodolistPages;
