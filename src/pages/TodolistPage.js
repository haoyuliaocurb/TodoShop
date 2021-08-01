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

// eslint-disable-next-line no-unused-vars
const INIT_BUTTONSTATE = {
  toolBar: {
    addTodolistButton: 1,
    deleteTodolistButton: 0,
  },
  todolist: {},
  todolistTable: {
    todolistTableItems: {},
  },
};

const TodolistPages = ({ windowWidth, isSignIn }) => {
  const currentUid = isSignIn;
  // console.log('<TodolistPage />: render');
  // console.log('<TodolistPage />: currentUid: ', currentUid);
  const { breakpoint } = styledVariables.todolistPages;
  const [todolistData, setTodolistData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [currentTodolistIdx, setCurrentTodolistIdx] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageAmount, setPageAmount] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [buttonState, setButtonState] = useState(INIT_BUTTONSTATE);
  const isUpdateButtonState = useRef(0);
  const isUpdateToolBar = useRef(0);
  const todolistDataIdxObj = useRef({});
  const [isOnTodolistTableScroll, setIsOnTodolistTableScroll] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [isManageMode, setIsManageMode] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [isAllTodolist, setIsAllTodolist] = useState(0);
  const [isUpdateTodolistAfterSignIn, setIsUpdateTodolistAfterSignIn] = useState(0);
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
          if (!fetchedTodolistData.empty) {
            setIsAllTodolist(1);
            if (pageAmount > 2) {
              setPageAmount((prePageAmount) => prePageAmount - 1);
            }
          }
          resolve(newTodolistData);
        });
    });
    return fetchDBTodolistDataPromise;
  };
  const readDBTodolistsData = async (currentUidValue, pageAmountValue = 1) => {
    const newLocalStorageTodolistData = JSON.parse(window.localStorage.getItem('TodoShopTodolist'));
    // console.log('newLocalStorageTodolistData: ', newLocalStorageTodolistData);
    if (!isSignIn) {
      if (!newLocalStorageTodolistData) {
        return;
      }
      setTodolistData(newLocalStorageTodolistData);
      return;
    }
    if (newLocalStorageTodolistData) {
      await firestore
        .collection('todolists')
        .add({
          uid: currentUidValue,
          updateTime: firebase.firestore.Timestamp.now(),
          items: newLocalStorageTodolistData[0].items,
        })
        .then(() => {
          window.localStorage.removeItem('TodoShopTodolist');
        });
    }
    const newTodolistData = await fetchDBTodolistData(currentUidValue, pageAmountValue);
    setTodolistData(newTodolistData);
    if (isOnTodolistTableScroll === 1) {
      setIsOnTodolistTableScroll(0);
    }
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
        // eslint-disable-next-line no-unused-vars
        const newTodolistData = await fetchDBTodolistData(currentUidValue, pageAmountValue);
        console.log('newTodolistData: ', newTodolistData);
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
  const deleteDBTodolistDate = async (
    todolistsDocIdArray,
    currentUidValue,
    pageAmountValue = 1,
  ) => {
    if (!currentUidValue) {
      return;
    }
    Promise.all(
      todolistsDocIdArray.map((todolistsDocId) =>
        firestore.collection('todolists').doc(todolistsDocId).delete(),
      ),
    ).then(async () => {
      const newTodolistData = await fetchDBTodolistData(currentUidValue, pageAmountValue);
      setTodolistData(newTodolistData);
    });
  };
  const handleTableItemClick = (value) => {
    // console.log('todolistData: ', todolistData);
    // console.log('todolistDataIdxObj.current[value.id]: ', todolistDataIdxObj.current[value.id]);

    const clickedListId = value.id;
    if (!todolistData) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    // console.log('currentListId: ', currentListId);
    if (pathArray.some((pathArrayValue) => pathArrayValue !== clickedListId)) {
      const listId = pathArray[pathArray.length - 1];
      if (listId === '') {
        return;
      }
      history.push(`/todolist/id/${clickedListId}`);
    }
    if (isUpdateButtonState.current !== 0) {
      return;
    }
    isUpdateButtonState.current = 1;
    const currentListIdxValue = todolistDataIdxObj.current[value.id];
    // console.log('currentListIdxValue: ', currentListIdxValue);
    setButtonState((preButtonState) => {
      const resetedTodolistTableItems = {};
      Object.keys(preButtonState.todolistTable.todolistTableItems).forEach((key) => {
        resetedTodolistTableItems[key] = 1;
      });
      const newButtonState = {
        ...preButtonState,
        todolistTable: {
          ...preButtonState.todolistTable,
          todolistTableItems: resetedTodolistTableItems,
        },
      };
      newButtonState.todolistTable.todolistTableItems[clickedListId] = 3;

      return newButtonState;
    });
    setCurrentTodolistIdx(currentListIdxValue);
  };
  const handleTodolistClick = () => {
    // console.log('trigger handleTodolistClick.');
    if (!todolistData) {
      return;
    }
    if (isUpdateButtonState.current !== 0) {
      return;
    }
    setButtonState((preButtonState) => {
      const newTodolistTableItems = {};
      const currentListId = Object.keys(todolistDataIdxObj.current).find(
        (key) => todolistDataIdxObj.current[key] === currentTodolistIdx,
      );
      // console.log('currentListId: ', currentListId);
      Object.keys(preButtonState.todolistTable.todolistTableItems).forEach((key) => {
        if (key === currentListId) {
          newTodolistTableItems[key] = 2;
        } else {
          newTodolistTableItems[key] = 1;
        }
      });

      const newButtonState = {
        ...preButtonState,
        toolBar: {
          addTodolistButton: 1,
          deleteTodolistButton: 0,
        },
        todolistTable: {
          ...preButtonState.todolistTable,
          todolistTableItems: newTodolistTableItems,
        },
      };
      isUpdateToolBar.current = 1;
      return newButtonState;
    });
    if (isManageMode === 1) {
      setIsManageMode(0);
    }
  };
  const handleNavBarManageButton = (isManageModeValue) => {
    // console.log('trigger handleNavBarManageButton');
    // console.log('isManageModeValue: ', isManageModeValue);
    if (isUpdateButtonState.current !== 0) {
      return;
    }
    if (!isManageModeValue) {
      setButtonState((preButtonState) => {
        const newTodolistTableItems = {};
        Object.keys(preButtonState.todolistTable.todolistTableItems).forEach((key) => {
          newTodolistTableItems[key] = 4;
        });
        const newButtonState = {
          ...preButtonState,
          toolBar: {
            ...preButtonState.toolBar,
            addTodolistButton: 0,
            deleteTodolistButton: 1,
          },
          todolistTable: {
            ...preButtonState.todolistTable,
            todolistTableItems: newTodolistTableItems,
          },
        };
        isUpdateToolBar.current = 1;
        return newButtonState;
      });
    } else {
      setButtonState((preButtonState) => {
        const newTodolistTableItems = {};
        const currentListId = Object.keys(todolistDataIdxObj.current).find(
          (docId) => todolistDataIdxObj.current[docId] === currentTodolistIdx,
        );
        Object.keys(preButtonState.todolistTable.todolistTableItems).forEach((key) => {
          if (key === currentListId) {
            newTodolistTableItems[key] = 2;
          }
          newTodolistTableItems[key] = 1;
        });
        const newButtonState = {
          ...preButtonState,
          toolBar: {
            ...preButtonState.toolBar,
            addTodolistButton: 1,
            deleteTodolistButton: 0,
          },
          todolistTable: {
            ...preButtonState.todolistTable,
            todolistTableItems: newTodolistTableItems,
          },
        };
        isUpdateToolBar.current = 1;
        return newButtonState;
      });
    }
    setIsManageMode((preIsManageMode) => {
      if (!preIsManageMode) {
        return 1;
      }
      return 0;
    });
  };
  const handleTableItemSelectButton = (isTableItemSelectedValue, listIdValue) => {
    // console.log('trigger handleTableItemSelectButton');
    if (isUpdateButtonState.current !== 0) {
      return;
    }
    if (isTableItemSelectedValue === 0) {
      setButtonState((preButtonState) => {
        const newButtonState = {
          ...preButtonState,
          todolistTable: {
            ...preButtonState.todolistTable,
            todolistTableItems: {
              ...preButtonState.todolistTable.todolistTableItems,
            },
          },
        };
        newButtonState.todolistTable.todolistTableItems[listIdValue] = 5;
        isUpdateToolBar.current = 1;
        return newButtonState;
      });
    }
    if (isTableItemSelectedValue === 1) {
      setButtonState((preButtonState) => {
        const newButtonState = {
          ...preButtonState,
          todolistTable: {
            ...preButtonState.todolistTable,
            todolistTableItems: {
              ...preButtonState.todolistTable.todolistTableItems,
            },
          },
        };
        newButtonState.todolistTable.todolistTableItems[listIdValue] = 4;
        isUpdateToolBar.current = 1;
        return newButtonState;
      });
    }
  };
  const handleToolBarCreateTodolistButton = () => {
    if (isUpdateButtonState.current !== 0) {
      return;
    }
    if (!isSignIn) {
      return;
    }
    createDBTodolistData(currentUid);
    setButtonState((preButtonState) => {
      const newTodolistTableItems = {};
      const currentListId = Object.keys(todolistDataIdxObj.current).find(
        (key) => todolistDataIdxObj.current[key] === currentTodolistIdx,
      );
      Object.keys(preButtonState.todolistTable.todolistTableItems).forEach((key) => {
        if (key === currentListId) {
          newTodolistTableItems[key] = 2;
        } else {
          newTodolistTableItems[key] = 1;
        }
      });
      const newButtonState = {
        ...preButtonState,
        todolistTable: {
          ...preButtonState.todolistTable,
          todolistTableItems: newTodolistTableItems,
        },
      };
      isUpdateToolBar.current = 1;
      return newButtonState;
    });
  };
  const handleToolBarDeleteTodolistButton = (buttonStateValue) => {
    // console.log('trigger handleToolBarDeleteTodolistButton');
    // console.log(
    //   'buttonState.todolistTable.todolistTableItems: ',
    //   buttonState.todolistTable.todolistTableItems,
    // );
    const listId2Delete = Object.keys(buttonState.todolistTable.todolistTableItems).filter(
      (key) => {
        return buttonStateValue.todolistTable.todolistTableItems[key] === 5;
      },
    );
    // console.log('listId2Delete: ', listId2Delete);
    deleteDBTodolistDate(listId2Delete, currentUid);
  };
  const handleNavBarChevronLeft = () => {
    if (pathArray[1] === 'id') {
      history.push('/todolist/table');
      return;
    }
    history.go(-1);
  };
  const handleTodolistTableScroll = (containerRef) => {
    // readDBTodolistsData(currentUid, pageAmount);
    // console.log('isOnTodolistTableScroll: ', isOnTodolistTableScroll);
    const containerValue = containerRef;
    // console.log('trigger handleTodolistTableScroll');
    // console.log('isAllTodolist: ', isAllTodolist);
    // console.log('isOnTodolistTableScroll: ', isOnTodolistTableScroll);
    // console.log('containerValue.offsetHeight: ', containerValue.offsetHeight);
    // console.log('containerValue.scrollTop: ', containerValue.scrollTop);
    // console.log('containerValue.scrollHeight: ', containerValue.scrollHeight);

    if (isAllTodolist) {
      return;
    }
    if (!containerRef) {
      return;
    }
    if (isOnTodolistTableScroll !== 0) {
      return;
    }
    // if (isOnScroll.current !== 0) {
    //   return;
    // }
    // eslint-disable-next-line no-unused-vars
    setIsOnTodolistTableScroll(1);

    // isOnScroll.current = 1;
    if (
      containerValue.offsetHeight + containerValue.scrollTop >=
      (containerValue.scrollHeight / 3) * 2
    ) {
      // console.log('trigger scroll conditional');
      setPageAmount((prePageAmount) => prePageAmount + 1);
    } else {
      setIsOnTodolistTableScroll(0);
    }
    // isOnScroll.current = 0;
  };

  useEffect(() => {
    if (isAllTodolist) {
      return;
    }
    readDBTodolistsData(currentUid, pageAmount);
  }, [isSignIn, pageAmount]);
  useEffect(() => {
    // console.log('todolistData: ', todolistData);
    if (isSignIn) {
      setIsUpdateTodolistAfterSignIn(1);
    }
    setCurrentTodolistIdx(0);
    if (isAllTodolist === 1) {
      setIsAllTodolist(0);
    }
  }, [todolistData]);
  useEffect(() => {
    // console.log('currentTodolistIdx: ', currentTodolistIdx);
  }, [currentTodolistIdx]);
  useEffect(() => {
    // console.log('isManageMode: ', isManageMode);
  }, [isManageMode]);

  // (2) 處理 Barstate
  const getInitBarState = (buttonStateValue) => {
    const INIT_BARSTATE = {
      navBar: {
        content: (
          <TodolistPageNavBar
            handleNavBarChevronLeft={handleNavBarChevronLeft}
            handleNavBarManageButton={handleNavBarManageButton}
            isManageMode={isManageMode}
            isSignIn={isSignIn}
          />
        ),
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
          <TodolistPageToolBar
            buttonState={buttonStateValue}
            handleToolBarCreateTodolistButton={handleToolBarCreateTodolistButton}
            handleToolBarDeleteTodolistButton={handleToolBarDeleteTodolistButton}
          />
        ),
        visibility: 2,
      },
    };
    return INIT_BARSTATE;
  };
  const INIT_BARSTATE = getInitBarState(buttonState);
  // console.log('INIT_BARSTATE: ', INIT_BARSTATE);

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
      }
      // if (pathArrayValue[1] === 'id') {
      // }
    };
    updateBarStateByPath(pathArray, buttonState);
  }, [windowWidth, currentUid]);

  useEffect(() => {
    // console.log('<TodolistPage />: useEffect depends on barState');
    // console.log('barState.toolBar: ', barState.toolBar);
  }, [barState]);

  const initTableItemsButtonState = (tableItemsButtonStateObj) => {
    if (isUpdateButtonState.current !== 0) {
      return;
    }
    isUpdateButtonState.current = 1;
    // console.log('trigger initTableItemsButtonState');
    // console.log('tableItemButtonStateObj: ', tableItemsButtonStateObj);
    setButtonState((preButtonState) => {
      let newButtonState = {};
      if (!isManageMode) {
        newButtonState = {
          ...INIT_BUTTONSTATE,
          todolistTable: {
            ...INIT_BUTTONSTATE.todolistTable,
            todolistTableItems: tableItemsButtonStateObj,
          },
        };
      }
      newButtonState = {
        ...INIT_BUTTONSTATE,
        todolistTable: {
          ...INIT_BUTTONSTATE.todolistTable,
          todolistTableItems: {
            ...tableItemsButtonStateObj,
            ...preButtonState.todolistTable.todolistTableItems,
          },
        },
      };
      return newButtonState;
    });
  };

  useEffect(() => {
    // console.log('buttonState: ', buttonState);
    isUpdateButtonState.current = 0;
    // console.log('isUpdateButtonState.current: ', isUpdateButtonState.current);
    if (isUpdateToolBar.current === 1) {
      setBarState((preBarState) => {
        const newBarState = {
          ...preBarState,
          navBar: {
            content: (
              <TodolistPageNavBar
                handleNavBarChevronLeft={handleNavBarChevronLeft}
                handleNavBarManageButton={handleNavBarManageButton}
                isManageMode={isManageMode}
              />
            ),
            visibility: 2,
          },
          toolBar: {
            content: (
              <TodolistPageToolBar
                buttonState={buttonState}
                handleToolBarCreateTodolistButton={handleToolBarCreateTodolistButton}
                handleToolBarDeleteTodolistButton={handleToolBarDeleteTodolistButton}
              />
            ),
            visibility: 2,
          },
        };
        return newBarState;
      });
      isUpdateToolBar.current = 0;
    }
  }, [buttonState]);

  useEffect(() => {
    // console.log('update barState');
  }, [barState]);

  // (3) 回傳 <TodolistPage /> 內容
  const getCurrentTodolistData = () => {
    if (!todolistData) {
      return null;
    }

    return todolistData[currentTodolistIdx];
  };
  const getCurrentTodolistId = () => {
    if (!todolistData) {
      return '';
    }
    return todolistData[currentTodolistIdx].id;
  };
  // eslint-disable-next-line consistent-return
  const getTodolistPageContent = () => {
    const currentTodolistData = getCurrentTodolistData();
    const currentListId = getCurrentTodolistId();
    // console.log('currentListId: ', currentListId);

    if (!isSignIn && windowWidth <= breakpoint) {
      // 判斷登入與否
      return (
        <Switch>
          <Route path="/todolist/table">
            <TodolistTable
              currentUid={currentUid}
              initTableItemsButtonState={initTableItemsButtonState}
              isUpdateTodolistAfterSignIn={isUpdateTodolistAfterSignIn}
            />
          </Route>
          <Route exact path="/todolist/id/">
            <Todolist
              updateDBTodolistData={updateDBTodolistData}
              currentUid={currentUid}
              handleTodolistClick={handleTodolistClick}
              initTableItemsButtonState={initTableItemsButtonState}
              readDBTodolistsData={readDBTodolistsData}
              currentTodolistData={currentTodolistData}
              isUpdateTodolistAfterSignIn={isUpdateTodolistAfterSignIn}
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
            <TodolistTable
              currentUid={currentUid}
              initTableItemsButtonState={initTableItemsButtonState}
              isUpdateTodolistAfterSignIn={isUpdateTodolistAfterSignIn}
            />
            <Todolist
              updateDBTodolistData={updateDBTodolistData}
              currentUid={currentUid}
              handleTodolistClick={handleTodolistClick}
              initTableItemsButtonState={initTableItemsButtonState}
              readDBTodolistsData={readDBTodolistsData}
              currentTodolistData={currentTodolistData}
              isUpdateTodolistAfterSignIn={isUpdateTodolistAfterSignIn}
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
              currentListIdx={currentTodolistIdx}
              handleTodolistClick={handleTodolistClick}
              buttonState={buttonState}
              initTableItemsButtonState={initTableItemsButtonState}
              currentTodolistIdx={currentTodolistIdx}
              isUpdateTodolistAfterSignIn={isUpdateTodolistAfterSignIn}
            />
          </Route>
          <Route exact path="/todolist/table">
            <TodolistTable
              pageAmount={pageAmount}
              deleteDBTodolistDate={deleteDBTodolistDate}
              handleTableItemClick={handleTableItemClick}
              currentUid={currentUid}
              todolistData={todolistData}
              currentTodolistIdx={currentTodolistIdx}
              initTableItemsButtonState={initTableItemsButtonState}
              buttonState={buttonState}
              handleTableItemSelectButton={handleTableItemSelectButton}
              handleTodolistTableScroll={handleTodolistTableScroll}
              isManageMode={isManageMode}
              isUpdateTodolistAfterSignIn={isUpdateTodolistAfterSignIn}
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
              handleTableItemClick={handleTableItemClick}
              currentUid={currentUid}
              todolistData={todolistData}
              currentTodolistIdx={currentTodolistIdx}
              initTableItemsButtonState={initTableItemsButtonState}
              buttonState={buttonState}
              handleTableItemSelectButton={handleTableItemSelectButton}
              handleTodolistTableScroll={handleTodolistTableScroll}
              isManageMode={isManageMode}
              isUpdateTodolistAfterSignIn={isUpdateTodolistAfterSignIn}
            />
            <Todolist
              currentUid={currentUid}
              pageAmount={pageAmount}
              readDBTodolistsData={readDBTodolistsData}
              updateDBTodolistData={updateDBTodolistData}
              currentTodolistData={currentTodolistData}
              currentListIdx={currentTodolistIdx}
              currentListId={currentListId}
              handleTodolistClick={handleTodolistClick}
              buttonState={buttonState}
              initTableItemsButtonState={initTableItemsButtonState}
              currentTodolistIdx={currentTodolistIdx}
              isUpdateTodolistAfterSignIn={isUpdateTodolistAfterSignIn}
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
