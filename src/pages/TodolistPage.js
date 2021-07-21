import { React, useState, useEffect, useRef } from 'react';
// import { Route, Redirect, Switch, useHistory, useLocation } from 'react-router-dom';
import { Route, Redirect, Switch, useLocation, useHistory } from 'react-router-dom';
import { firestore, firebase } from '../utils/firebase/firebase-services';
import Todolist from '../components/TodolistPage/Todolist/Todolist';
import TodolistTable from '../components/TodolistPage/TodolistTable/TodolistTable';
import { styledVariables } from '../styles/app/cssMaterial';

import NavBar from '../components/app/NavBar';
import ToolBar from '../components/app/ToolBar';
import TabBar from '../components/app/TabBar';
import TodolistPageNavBar from '../components/TodolistPage/TodolistPageNavBar';
import TodolistPageToolBar from '../components/TodolistPage/TodolistPageToolBar';
import GeneralTabBar from '../components/app/GeneralTabBar';

import StyledTodolistPage from '../styles/TodolistPage/StyledTodolistPage';

const TodolistPages = ({ handleIcon2SearchClick, windowWidth, isSignIn }) => {
  // Todolist、TodolistPage 切換及資料
  const currentUid = isSignIn;
  console.log('render TodolistPages');
  const { breakpoint } = styledVariables.todolistPages;
  // console.log('currentUid when rendering TodolistPages: ', currentUid);

  // 處理 todolistData
  const [todolistData, setTodolistData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [currentListInfo, setCurrentListInfo] = useState({ idx: 0, itemButtonState: 2 });
  const listIdxObj = useRef({});
  // console.log('listIdxObj.current: ', listIdxObj.current);
  // const getIdxByListId = (listId) => listIdxObj.current[listId];

  const getCurrentTodolistData = async (currentUidValue) => {
    const fetchTodolistData = async (innerCurrentUidValue) => {
      // eslint-disable-next-line consistent-return
      const innerFetchTodolistData = new Promise((resolve) => {
        if (!innerCurrentUidValue) {
          return resolve(null);
        }

        const newTodolistData = [];
        const newListIdxObj = {};
        // let fetchedTodolistDataCounter = 0;
        firestore
          .collection('todolists')
          .where('uid', '==', innerCurrentUidValue)
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
    };

    // 登入狀態改變時，也會重新 setTodolistData
    const newTodolistData = await fetchTodolistData(currentUidValue);
    if (!newTodolistData) {
      setTodolistData(null);
      return;
    }
    setTodolistData(newTodolistData);
  };

  useEffect(() => {
    if (!isSignIn) {
      return;
    }
    getCurrentTodolistData(currentUid);
  }, [isSignIn]);

  useEffect(() => {
    console.log('TodolistPage: useEffect depends on todolistData');
    setCurrentListInfo({ idx: 0, itemButtonState: 2 });
    // console.log('!todolistData: ', !todolistData);
    // if (!todolistData) {
    //   return;
    // }
    // todolistData.forEach((srcValue) => {
    //   const value = srcValue.data();
    //   console.log('value: ', value);
    // });
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

  const updateTodolistData = async (currentListId, currentListIdx) => {
    console.log('trigger handleTodolistInputKeyUp');
    // console.log('currentListId: ', currentListId);
    const newCertainTodolistData = await firestore.collection('todolists').doc(currentListId).get();
    setTodolistData((oldTodolistData) => {
      const newTodolistData = [...oldTodolistData];
      newTodolistData[currentListIdx] = newCertainTodolistData;

      return newTodolistData;
    });
  };
  // eslint-disable-next-line no-unused-vars
  const createTodolist = async (currentUidValue) => {
    if (!currentUidValue) {
      return;
    }
    firestore
      .collection('todolists')
      .add({
        uid: currentUid,
        updateTime: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        console.log('succefully create new Todolist on DB');
        firestore
          .collection('todolists')
          .where('uid', '==', currentUidValue)
          .orderBy('updateTime', 'desc')
          .limit(15)
          .get()
          .then((fetchedTodolistData) => {
            if (!fetchedTodolistData) {
              return;
            }
            const newTodolistData = [];
            fetchedTodolistData.forEach((value) => {
              console.log('value.data(): ', value.data());
              newTodolistData.push(value);
            });
            console.log('newTodolistData: ', newTodolistData);
            setTodolistData(newTodolistData);
          });
      });
  };

  const INIT_BARSTATE = {
    navBar: {
      content: <TodolistPageNavBar />,
      visibility: 2,
    },
    tabBar: {
      content: (
        <GeneralTabBar
        // handleTabBarSearchTabClick={handleTabBarSearchTabClick}
        // handleTabBarHomeTabClick={handleTabBarHomeTabClick}
        // handleTabBarCartTabClick={handleTabBarCartTabClick}
        // handleTabBarAuthTabClick={handleTabBarAuthTabClick}
        // handleTabBarListTabClick={handleTabBarListTabClick}
        />
      ),
      visibility: 2,
    },
    toolBar: {
      content: <TodolistPageToolBar createTodolist={createTodolist} currentUid={currentUid} />,
      visibility: 2,
    },
  };
  const [barState, setBarState] = useState(INIT_BARSTATE);

  // eslint-disable-next-line consistent-return
  const getTodolistPageContent = () => {
    const currentListData = getCurrentListData();
    if (currentListData) {
      // console.log('currentListData.data(): ', currentListData.data());
    }
    const currentListId = getCurrentListId();
    console.log('currentListId: ', currentListId);

    if (!isSignIn && windowWidth <= breakpoint) {
      // 判斷登入與否
      return (
        <Switch>
          <Route path="/todolist/table">
            <TodolistTable isSignIn={false} />
          </Route>
          <Route exact path="/todolist/id/">
            <Todolist
              updateTodolistData={updateTodolistData}
              isSignIn={false}
              handleTodolistClick={handleTodolistClick}
            />
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
            <Todolist
              updateTodolistData={updateTodolistData}
              isSignIn={false}
              handleTodolistClick={handleTodolistClick}
            />
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
              updateTodolistData={updateTodolistData}
              currentListData={currentListData}
              currentListInfo={currentListInfo}
              currentListIdx={currentListInfo.idx}
              handleTodolistClick={handleTodolistClick}
            />
          </Route>
          <Route exact path="/todolist/table">
            <TodolistTable
              handleIcon2SearchClick={handleIcon2SearchClick}
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
              handleIcon2SearchClick={handleIcon2SearchClick}
              onTableItemClick={handleTableItemClick}
              // eslint-disable-next-line react/jsx-boolean-value
              isSignIn={true}
              todolistData={todolistData}
              currentListInfo={currentListInfo}
            />
            <Todolist
              // eslint-disable-next-line react/jsx-boolean-value
              isSignIn={true}
              getCurrentTodolistData={getCurrentTodolistData}
              currentUid={currentUid}
              updateTodolistData={updateTodolistData}
              currentListData={currentListData}
              currentListIdx={currentListInfo.idx}
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

  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  useEffect(() => {
    const updateBarStateByPath = (pathArrayValue) => {
      console.log('trigger updateBarStateByPath');
      console.log('pathArrayValue[1]: ', pathArrayValue[1]);
      if (!(windowWidth <= breakpoint)) {
        console.log('fault');
        setBarState({
          ...INIT_BARSTATE,
          toolBar: {
            ...INIT_BARSTATE.toolBar,
            visibility: 2,
          },
        });
        return;
      }
      if (pathArrayValue[1] === 'table') {
        setBarState({
          ...INIT_BARSTATE,
          toolBar: {
            ...INIT_BARSTATE.toolBar,
            visibility: 2,
          },
        });
        return;
      }
      if (pathArrayValue[1] === 'id') {
        console.log('trigger toolBarState.visibility = 0');
        setBarState({
          ...INIT_BARSTATE,
          toolBar: {
            ...INIT_BARSTATE.toolBar,
            visibility: 0,
          },
        });
      }
    };
    updateBarStateByPath(pathArray);
  }, [windowWidth]);

  useEffect(() => {
    console.log('barState.toolBar: ', barState.toolBar);
  }, [barState]);

  return (
    <StyledTodolistPage>
      <NavBar navBarState={barState.navBar} />
      {getTodolistPageContent()}
      <ToolBar toolBarState={barState.toolBar} />
      <TabBar backgroundColor={styledVariables.color.gray100} tabBarState={barState.tabBar} />
    </StyledTodolistPage>
  );
};

export default TodolistPages;
