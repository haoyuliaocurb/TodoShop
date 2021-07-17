// script
import { React, useState, useEffect, useCallback, useRef } from 'react';
// import { Route, Redirect, Switch, useHistory, useLocation } from 'react-router-dom';
import { Route, Redirect, Switch, useLocation, useHistory } from 'react-router-dom';
import { firestore } from '../utils/firebase/firebase-services';
import Todolist from '../components/TodolistPage/Todolist/Todolist';
import TodolistTable from '../components/TodolistPage/TodolistTable/TodolistTable';
import { styledVariables } from '../styles/app/cssMaterial';

// styling
import StyledTodolistPage from '../styles/TodolistPage/StyledTodolistPage';

const TodolistPages = ({ windowWidth, isSignIn }) => {
  console.log('render TodolistPages');
  const { breakpoint } = styledVariables.todolistPages;
  // console.log('currentUid when rendering TodolistPages: ', currentUid);

  // 處理 todolistData
  const [todolistData, setTodolistData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [currentListInfo, setCurrentListInfo] = useState({ idx: 0, itemButtonState: 2 });
  // const lastListId = useRef('');
  // const srcCurrentListId = useRef('');
  // const currentListData = useRef(null);
  // const [currentListId, setCurrentListId] = useState('');

  const listIdxObj = useRef({});
  // console.log('listIdxObj.current: ', listIdxObj.current);
  const fetchTodolistData = useCallback(async () => {
    // eslint-disable-next-line consistent-return
    const innerFetchTodolistData = new Promise((resolve) => {
      const currentUid = isSignIn;
      if (!isSignIn) {
        return resolve(null);
      }

      const newTodolistData = [];
      const newListIdxObj = {};
      // let fetchedTodolistDataCounter = 0;
      firestore
        .collection('todolists')
        .where('uid', '==', currentUid)
        .orderBy('updateTime', 'desc')
        .limit(15)
        .get()
        .then((fetchedTodolistData) => {
          // console.log(typeof fetchedTodolistData);
          let counter = 0;
          fetchedTodolistData.forEach((value) => {
            // console.log(value.data());
            newTodolistData.push(value);
            newListIdxObj[value.id] = counter;
            counter += 1;
          });
          listIdxObj.current = newListIdxObj;
          resolve(newTodolistData);
        });
    });
    const promiseReturned = Promise.resolve(innerFetchTodolistData);
    return promiseReturned;
  }, [isSignIn]);

  // const getIdxByListId = (listId) => listIdxObj.current[listId];

  useEffect(() => {
    const getCurrentTodolistData = async () => {
      // 登入狀態改變時，也會重新 setTodolistData
      const newTodolistData = await fetchTodolistData();
      if (!newTodolistData) {
        setTodolistData(null);
        return;
      }
      setTodolistData(newTodolistData);
    };
    getCurrentTodolistData();
  }, [fetchTodolistData]);

  useEffect(() => {
    // console.log('useEffect depends on todolistData');
    // console.log('todolistData in useEffect on todolistData in TodolistPage: ', todolistData);
    // console.log(
    //   'listIdxObj.current in useEffect on todolistData in TodolistPage: ',
    //   listIdxObj.current,
    // );
  }, [todolistData]);

  const getCurrentListData = () => {
    // console.log('trigger getCurrentListData');
    // console.log('todolistData: ', todolistData);
    // console.log('!todolistData: ', !todolistData, 'todolistData: ', todolistData);
    if (!todolistData) {
      return null;
    }

    return todolistData[currentListInfo.idx];
  };
  const getCurrentListId = () => {
    // console.log('trigger getCurrentListId');
    // console.log('!todolistData: ', !todolistData, 'todolistData: ', todolistData);
    if (!todolistData) {
      return '';
    }
    // console.log('todolistData[currentListInfo.idx].id: ', todolistData[currentListInfo.idx].id);

    return todolistData[currentListInfo.idx].id;
  };

  // eslint-disable-next-line prefer-const
  let pathArray = useLocation().pathname.split('/');
  pathArray.shift();
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  useEffect(() => {
    // console.log('currentListInfo: ', currentListInfo);
  }, [currentListInfo]);

  const handleTableItemClick = (value) => {
    // console.log('TableItem onClick: begin to setCurrentListInfo');
    // console.log('todolistData: ', todolistData);
    // console.log('listIdxObj.current[value.id]: ', listIdxObj.current[value.id]);

    const clickedListId = value.id;
    // console.log('currentListId: ', currentListId);
    if (pathArray.some((pathArrayValue) => pathArrayValue !== clickedListId)) {
      const listId = pathArray[pathArray.length - 1];
      if (listId === '') {
        return;
      }
      history.push(`/todolist/id/${clickedListId}`);
    }

    setCurrentListInfo({ idx: listIdxObj.current[value.id], itemButtonState: 1 });
    if (!todolistData) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  const handleTodolistClick = () => {
    // console.log('trigger handleTodolistClick.');
    if (!todolistData) {
      return;
    }
    setCurrentListInfo((prevCurrentListInfo) => ({ ...prevCurrentListInfo, itemButtonState: 2 }));
  };

  // eslint-disable-next-line consistent-return
  const getTodolistPageContent = () => {
    const currentListData = getCurrentListData();
    if (currentListData) {
      // console.log('currentListData.data(): ', currentListData.data());
    }
    const currentListId = getCurrentListId();
    // console.log('currentListId: ', currentListId);

    if (!isSignIn && windowWidth <= breakpoint) {
      // 判斷登入與否
      return (
        <Switch>
          <Route path="/todolist/table">
            <TodolistTable isSignIn={false} />
          </Route>
          <Route exact path="/todolist/id/">
            <Todolist isSignIn={false} handleTodolistClick={handleTodolistClick} />
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
            <Todolist isSignIn={false} handleTodolistClick={handleTodolistClick} />
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
              currentListInfo={currentListInfo}
              handleTodolistClick={handleTodolistClick}
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
      // console.log('getTodolistPageContent: isSignIn && !(windowWidth <= breakpoint)');
      return (
        <Switch>
          <Route path="/todolist/id/:listId">
            <TodolistTable
              onTableItemClick={handleTableItemClick}
              // eslint-disable-next-line react/jsx-boolean-value
              isSignIn={true}
              todolistData={todolistData}
              currentListInfo={currentListInfo}
            />
            <Todolist
              // eslint-disable-next-line react/jsx-boolean-value
              isSignIn={true}
              currentListData={currentListData}
              currentListId={currentListId}
              handleTodolistClick={handleTodolistClick}
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

/*
click 了之後 -> setTodolistData( 改 { currentListIdx })
getIdxByListId(ListId)

listIdxObj

*/
