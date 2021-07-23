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

const TodolistPages = ({ windowWidth, isSignIn, handleIcon2SearchClick }) => {
  const currentUid = isSignIn;
  console.log('<TodolistPage />: render');
  // console.log('<TodolistPage />: currentUid: ', currentUid);
  const { breakpoint } = styledVariables.todolistPages;
  const [todolistData, setTodolistData] = useState(null);
  const [currentTodolistInfo, setCurrentTodolistInfo] = useState({ idx: 0, itemButtonState: 2 });
  // eslint-disable-next-line no-unused-vars
  const [pageAmount, setPageAmount] = useState(1);
  const todolistDataIdxObj = useRef({});
  // eslint-disable-next-line prefer-const
  let pathArray = useLocation().pathname.split('/');
  pathArray.shift();
  // eslint-disable-next-line prefer-const
  let history = useHistory();

  const fetchDBTodolistData = async (currentUidValue, pageAmountValue = 1) => {
    // eslint-disable-next-line consistent-return
    const fetchDBTodolistDataPromise = new Promise((resolve) => {
      if (!currentUidValue) {
        return resolve(null);
      }

      const newTodolistData = [];
      const newTodoistDataIdxObj = {};
      firestore
        .collection('todolists')
        .where('uid', '==', currentUidValue)
        .orderBy('updateTime', 'desc')
        .limit(pageAmountValue * 15)
        .get()
        .then((fetchedTodolistData) => {
          // console.log(typeof fetchedTodolistData);
          if (!fetchedTodolistData) {
            resolve(null);
          }

          let indexCounter = 0;
          fetchedTodolistData.forEach((value) => {
            // console.log(value.data());
            newTodolistData.push(value);
            newTodoistDataIdxObj[value.id] = indexCounter;
            indexCounter += 1;
          });
          todolistDataIdxObj.current = newTodoistDataIdxObj;
          resolve(newTodolistData);
        });
    });
    return fetchDBTodolistDataPromise;
  };
  const readDBTodolistsData = async (currentUidValue, pageAmountValue = 1) => {
    // 登入狀態改變時，也會重新 setTodolistData
    const newTodolistData = await fetchDBTodolistData(currentUidValue, pageAmountValue);
    setTodolistData(newTodolistData);
  };
  const updateDBTodolistData = async (
    todolistsDocId,
    newTodolistsDocDataPart,
    currentUidValue,
    pageAmountValue = 1,
  ) => {
    if (!currentUidValue) {
      return;
    }
    firestore
      .collection('todolists')
      .doc(todolistsDocId)
      .update(newTodolistsDocDataPart)
      .then(async () => {
        // console.log(
        //   '<Todolist />: updateDBTodolistData: successfully update DB todolists doc ',
        //   todolistsDocId,
        // );
        const newTodolistData = await fetchDBTodolistData(currentUidValue, pageAmountValue);
        setTodolistData(newTodolistData);
      });
  };
  // eslint-disable-next-line no-unused-vars
  const createDBTodolistData = async (currentUidValue, pageAmountValue = 1) => {
    if (!currentUidValue) {
      return;
    }
    firestore
      .collection('todolists')
      .add({
        uid: currentUidValue,
        updateTime: firebase.firestore.Timestamp.now(),
      })
      .then(async () => {
        // console.log(
        //   '<Todolist />: createDBTodolistData: successfully create doc in DB todolists',
        //   todolistsDocId,
        // );
        const newTodolistData = await fetchDBTodolistData(currentUidValue, pageAmountValue);
        setTodolistData(newTodolistData);
      });
  };
  const deleteDBTodolistDate = async (todolistsDocId, currentUidValue, pageAmountValue = 1) => {
    if (!currentUidValue) {
      return;
    }
    firestore
      .collection('todolists')
      .doc(todolistsDocId)
      .delete()
      .then(async () => {
        // console.log(
        //   '<Todolist />: deleteDBTodolistDate: successfully delete DB todolists doc ',
        //   todolistsDocId,
        // );
        const newTodolistData = await fetchDBTodolistData(currentUidValue, pageAmountValue);
        setTodolistData(newTodolistData);
      });
  };
  const handleTableItemClick = (value) => {
    // console.log('todolistData: ', todolistData);
    // console.log('todolistDataIdxObj.current[value.id]: ', todolistDataIdxObj.current[value.id]);

    const clickedListId = value.id;
    // console.log('currentListId: ', currentListId);
    if (pathArray.some((pathArrayValue) => pathArrayValue !== clickedListId)) {
      const listId = pathArray[pathArray.length - 1];
      if (listId === '') {
        return;
      }
      history.push(`/todolist/id/${clickedListId}`);
    }

    setCurrentTodolistInfo({ idx: todolistDataIdxObj.current[value.id], itemButtonState: 1 });
    if (!todolistData) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  useEffect(() => {
    if (!isSignIn) {
      return;
    }
    readDBTodolistsData(currentUid);
  }, [isSignIn]);
  useEffect(() => {
    // console.log('<TodolistPage />: useEffect depends on todolistData');
    setCurrentTodolistInfo({ idx: 0, itemButtonState: 2 });
  }, [todolistData]);
  useEffect(() => {
    // console.log('currentTodolistInfo: ', currentTodolistInfo);
  }, [currentTodolistInfo]);

  const handleTodolistClick = () => {
    // console.log('trigger handleTodolistClick.');
    if (!todolistData) {
      return;
    }
    setCurrentTodolistInfo((prevCurrentListInfo) => ({
      ...prevCurrentListInfo,
      itemButtonState: 2,
    }));
  };

  // (2) 處理 Barstate
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
      content: (
        <TodolistPageToolBar createDBTodolistData={createDBTodolistData} currentUid={currentUid} />
      ),
      visibility: 2,
    },
  };
  const [barState, setBarState] = useState(INIT_BARSTATE);

  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  useEffect(() => {
    const updateBarStateByPath = (pathArrayValue) => {
      // console.log('trigger updateBarStateByPath');
      // console.log('pathArrayValue[1]: ', pathArrayValue[1]);
      if (!(windowWidth <= breakpoint)) {
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
    // console.log('<TodolistPage />: useEffect depends on barState');
    // console.log('barState.toolBar: ', barState.toolBar);
  }, [barState]);

  // (3) 回傳 <TodolistPage /> 內容
  const getCurrentTodolistData = () => {
    if (!todolistData) {
      return null;
    }

    return todolistData[currentTodolistInfo.idx];
  };
  const getCurrentTodolistId = () => {
    if (!todolistData) {
      return '';
    }
    // console.log('todolistData[currentTodolistInfo.idx].id: ', todolistData[currentTodolistInfo.idx].id);

    return todolistData[currentTodolistInfo.idx].id;
  };
  // eslint-disable-next-line consistent-return
  const getTodolistPageContent = () => {
    const currentTodolistData = getCurrentTodolistData();
    if (currentTodolistData) {
      // console.log('currentTodolistData.data(): ', currentTodolistData.data());
    }
    const currentListId = getCurrentTodolistId();
    // console.log('currentListId: ', currentListId);

    if (!isSignIn && windowWidth <= breakpoint) {
      // 判斷登入與否
      return (
        <Switch>
          <Route path="/todolist/table">
            <TodolistTable currentUid={currentUid} />
          </Route>
          <Route exact path="/todolist/id/">
            <Todolist
              updateDBTodolistData={updateDBTodolistData}
              currentUid={currentUid}
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
            <TodolistTable currentUid={currentUid} />
            <Todolist
              updateDBTodolistData={updateDBTodolistData}
              currentUid={currentUid}
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
              currentUid={currentUid}
              pageAmount={pageAmount}
              updateDBTodolistData={updateDBTodolistData}
              currentTodolistData={currentTodolistData}
              currentTodolistInfo={currentTodolistInfo}
              currentListIdx={currentTodolistInfo.idx}
              handleTodolistClick={handleTodolistClick}
            />
          </Route>
          <Route exact path="/todolist/table">
            <TodolistTable
              pageAmount={pageAmount}
              deleteDBTodolistDate={deleteDBTodolistDate}
              handleIcon2SearchClick={handleIcon2SearchClick}
              handleTableItemClick={handleTableItemClick}
              currentUid={currentUid}
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
              pageAmount={pageAmount}
              deleteDBTodolistDate={deleteDBTodolistDate}
              handleIcon2SearchClick={handleIcon2SearchClick}
              handleTableItemClick={handleTableItemClick}
              currentUid={currentUid}
              todolistData={todolistData}
              currentTodolistInfo={currentTodolistInfo}
            />
            <Todolist
              currentUid={currentUid}
              pageAmount={pageAmount}
              readDBTodolistsData={readDBTodolistsData}
              updateDBTodolistData={updateDBTodolistData}
              currentTodolistData={currentTodolistData}
              currentListIdx={currentTodolistInfo.idx}
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
