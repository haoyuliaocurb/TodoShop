// script
import { React, useState, useEffect } from 'react';
// import { Route, Redirect, Switch, useHistory, useLocation } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
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
  console.log('currentUid when rendering TodolistPages: ', currentUid);

  // 處理 todolistData
  const [todolistData, setTodolistData] = useState(null);
  // const srcCurrentListId = useRef('');
  // const currentListData = useRef(null);
  // const [currentListId, setCurrentListId] = useState('');

  const fetchTodolistData = async () => {
    // eslint-disable-next-line consistent-return
    const innerFetchTodolistData = new Promise((resolve) => {
      if (!isSignIn) {
        return [];
      }
      const newTodolistData = [];
      // let fetchedTodolistDataCounter = 0;
      firestore
        .collection('todolist')
        .where('uid', '==', currentUid)
        .orderBy('updateTime', 'desc')
        .limit(15)
        .get()
        .then((fetchedTodolistData) => {
          // console.log('fetchedTodolistData: ', fetchedTodolistData);
          // console.log('trigger QuerySnapshot .then');
          fetchedTodolistData.forEach((value) => {
            // console.log('element of TodolistData');
            // console.log('value: ', value);
            newTodolistData.push(value);
            // console.log('newTodolistData: ', newTodolistData);
            // fetchedTodolistDataCounter += 1;
          });
        });
      resolve(newTodolistData);
    });
    const promiseReturned = Promise.resolve(innerFetchTodolistData);
    return promiseReturned;
  };

  useEffect(() => {
    console.log('isSignIn: ', isSignIn);
    const getCurrentTodolistData = async () => {
      // 登入狀態改變時，也會重新 setTodolistData
      const newTodolistData = await fetchTodolistData();
      setTodolistData({ currentListIdx: 0, dataArray: newTodolistData });
      // console.log('useEffect depends on isSignIn');
    };
    if (!isSignIn) {
      return;
    }
    getCurrentTodolistData();
  }, [isSignIn]);

  // const history = useHistory();
  // const location = useLocation();
  useEffect(() => {
    // console.log('useEffect depends on todolistData');
    console.log('todolistData: ', todolistData);
    // console.log('----------');

    // const { currentListIdx } = todolistData;
    // const currentListId = todolistData.dataArray[currentListIdx].id;
    // const currentListId = 'test';

    // const pathArray = location.pathname.split('/');
    // if (pathArray.some((value) => value === 'id')) {
    //   const listId = pathArray[pathArray.length - 1];
    //   if (listId === '') {
    //     return;
    //   }

    //   /*
    //   if (listId !== currentListId) {
    //     history.push(`/todolist`);
    //   }
    //   */
    // }
  }, [todolistData]);

  const handleTableItemClick = (value) => {
    console.log('TableItem onClick: begin to setCurrentListId');
    setTodolistData({ ...todolistData, currentListIdx: value.id });
  };

  // eslint-disable-next-line consistent-return
  const getTodolistPageContent = () => {
    const getCurrentListData = () => {
      console.log('!todolistData: ', !todolistData);
      // console.log('!todolistData: ', !todolistData, 'todolistData: ', todolistData);
      if (!todolistData) {
        return null;
      }
      console.log('todolistData.dataArray: ', todolistData.dataArray);
      if (!todolistData.dataArray) {
        return null;
      }

      const { dataArray, currentListIdx } = todolistData;
      return dataArray[currentListIdx];
    };
    const getCurrentListId = () => {
      // console.log('!todolistData: ', !todolistData, 'todolistData: ', todolistData);
      if (!todolistData) {
        return '';
      }
      const { dataArray, currentListIdx } = todolistData;
      return dataArray[currentListIdx].id;
    };
    const currentListData = getCurrentListData();
    const currentListId = getCurrentListId();

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
              currentListData={currentListData}
              currentListId={currentListId}
            />
          </Route>
          <Route exact path="/todolist/table">
            <TodolistTable
              onTableItemClick={handleTableItemClick}
              // eslint-disable-next-line react/jsx-boolean-value
              isSignIn={true}
              todolistData={todolistData}
            />
          </Route>
          <Redirect from="/todolist" to={`/todolist/id/${currentListId}`} />
        </Switch>
      );
    }
    if (isSignIn && !(windowWidth <= breakpoint)) {
      console.log('getTodolistPageContent: isSignIn && !(windowWidth <= breakpoint)');
      return (
        <Switch>
          <Route path="/todolist/id/:listId">
            <TodolistTable
              onTableItemClick={handleTableItemClick}
              // eslint-disable-next-line react/jsx-boolean-value
              isSignIn={true}
              todolistData={todolistData}
            />
            <Todolist
              // eslint-disable-next-line react/jsx-boolean-value
              isSignIn={true}
              currentListData={currentListData}
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
