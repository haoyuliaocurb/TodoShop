import Todolist from '../features/todolistPages/Todolist.js'
import TodolistTable from '../features/todolistPages/TodolistTable.js'
import Auth from './Auth.js'
import styled from '@emotion/styled'
import { 
  styledVariables,
  styledCSS,
  StyledIcon,
} from './cssMaterial.js';
import {
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  Switch,
  useHistory,
} from 'react-router-dom';
import { 
  firebase,
  auth,
  firestore
} from './firebase-services.js';

import IconApp from './IconApp.js'

let data = [
  {
    name: 'xLCxgZt9Fg9wtq3SRxaF',
    updateTime: '2020/01/28',
    items: [
      {
        name: '洗髮精',
      },
      {
        name: '乳液'
      },
      {
        name: '保鮮盒',
      },
      {
        name: '保鮮盒',
      },
    ]
  },
  {
    name: 'Lem9rZRQP1ppTIgljoXQ',
    updateTime: '2019/01/28',
    items: [
      {
        name: '衛生紙',
      },
      {
        name: '牙線'
      },
      {
        name: '漱口水',
      },
    ]
  }
]

const StyledNavBar = styled.nav`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  background-color: ${styledVariables.color.gray100};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  padding: 0 ${styledVariables.shared.contentPadding};

  > a {
    > img {
      position: absolute;
      left: ${styledVariables.shared.contentPadding};
      top: 0;
      bottom: 0;
      margin: auto 0;      
      width: ${styledVariables.navBar.iconWidth};
      height: ${styledVariables.navBar.iconWidth};
    }
  }

  > h1 {
    text-align: center;
  }

  > button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: ${styledVariables.shared.contentPadding};
    margin: auto 0;
    display: inline-block;
    width: ${styledVariables.navBar.buttonWidth};
    height: ${styledVariables.navBar.iconWidth};
    // border: solid 1px black;
  }
`;

const NavBar = () => {
  return (
    <StyledNavBar>
      <Link to="/todolist/table">
        <IconApp.ChevronLeft />
      </Link>
      <h1>
        您的購物清單
      </h1>
      <button>
        管理
      </button>
    </StyledNavBar>
  )
}

const StyledTabBar = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  background-color: ${styledVariables.color.gray100};
  display: flex;
  flex-wrap: nowrap;
  z-index: 10;
  padding: 0 ${styledVariables.shared.contentPadding};

  > a {
    margin-top: 7px;
    display: inline-block;
    flex: 100px 1 1;
    // border: solid blue 1px;
    // display: flex;
  }
`;

const StyledIconApp = styled.span`
  ${styledCSS.iconColorState};
  position: relative;
  // border: black solid 1px;

  > svg {
    display: block;
    width: ${styledVariables.tabBar.iconWidth};
    height: ${styledVariables.tabBar.iconWidth};
    margin: 0 auto;
  }

  > p.textIcon {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 3px 0;
    text-align: center;
    font-size: 10px;
  }
`;

const TabBar = () => {
  const getNewIconState = (targetId) => {
    let iconInitState = {
      disabled: {
        home: false,
        activity: false,
        cart: false,
        auth: false,
        list: false,
      },
      active: {
        home: false,
        activity: false,
        cart: false,
        auth: false,
        list: false,      
      }
    };

    if (!targetId) {
      return iconInitState
    }
    else {
      let newIconState = {
        disabled: { ... iconInitState.disabled} ,
        active: { ... iconInitState.active},
      }
      newIconState['active'][targetId] = true;

      return newIconState
    }
  }

  let [iconState, setIconState] = useState(() => getNewIconState());


  const handleIconClick = (e) => {
    e.stopPropagation();
    let targetId = e.currentTarget.id;
    // console.log('targetId: ', targetId);
    setIconState(getNewIconState(targetId));
  };

  useEffect(
    () => {
    setIconState(getNewIconState('home'));
  }, []);

  useEffect(
    () => {
    // console.log('new iconState: ', iconState);
  }, [iconState]);

  return (
    <StyledTabBar>
      <Link to="/" id="home" onClick={handleIconClick}>
        <StyledIconApp disabled={iconState.disabled.home} active={iconState.active.home}>
          <IconApp.Home />
          <p className="textIcon">首頁</p>
        </StyledIconApp>
      </Link>
      <Link to="/activity" id="activity" onClick={handleIconClick}>
        <StyledIconApp disabled={iconState.disabled.activity} active={iconState.active.activity}>
          <IconApp.Activity />
          <p className="textIcon">優惠活動</p>
        </StyledIconApp>
      </Link>
      <Link to="/cart" id="cart" onClick={handleIconClick}>
        <StyledIconApp disabled={iconState.disabled.cart} active={iconState.active.cart}>
          <IconApp.Cart />
          <p className="textIcon">購物車</p>          
        </StyledIconApp>        
      </Link>
      <Link to="/auth" id="auth" onClick={handleIconClick}>
        <StyledIconApp disabled={iconState.disabled.auth} active={iconState.active.auth}>
          <IconApp.Auth />
          <p className="textIcon">我的帳號</p>          
        </StyledIconApp>
      </Link>
      <Link to="/todolist" id="list" onClick={handleIconClick}>
        <StyledIconApp disabled={iconState.disabled.list} active={iconState.active.list}>
          <IconApp.List />
          <p className="textIcon">購物清單</p>          
        </StyledIconApp>        
      </Link>
    </StyledTabBar>
  )
}

const StyledToolBar = styled.div`
  position: absolute;
  bottom: ${styledVariables.shared.barHeight};
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  // border: solid 1px black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
  padding: 0 ${styledVariables.shared.contentPadding};

  > .buttonAddTodolist {
    height: 30px;
    padding: 0 10px;
    margin-right: 10px;
    background-color: ${styledVariables.color.pink100};
    border-radius: 100px;
  }
`;

const ToolBar = () => {
  return (
    <StyledToolBar>
      <button className="buttonAddTodolist">
        新增購物清單 +
      </button>
    </StyledToolBar>
  )
}

const StyledTodolistPages = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const TodolistPages = (props) => {
  // console.log('render TodolistPages');

  let breakpoint = styledVariables.todolistPages.breakpoint;
  let { windowWidth, isSignIn} = props;
  let currentUid = isSignIn;
  // console.log('isSignIn when rendering TodolistPages: ', isSignIn);

  // 處理 todolistData
  let [todolistData, setTodolistData] = useState([]);
  let srcCurrentListId = useRef('');
  let currentListData = useRef(null);
  let [currentListId, setCurrentListId] = useState('');

  const getCurrentTodolistData = async (resolve) => {
    let promiseReturned = new Promise((resolve) => {
      if (!isSignIn) {
        return []
      }
  
      // console.log('currentUser.uid: ', currentUser.uid);
      let newTodolistData = [];
      let fetchedNewTodolistDataCounter = 0;
  
      firestore.collection('todolist').where('uid', '==', currentUid).orderBy('updateTime', 'desc').limit(15).get()
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

        resolve(newTodolistData);
      })
    });

    return promiseReturned
  }

  useEffect(async () => {
    // 登入狀態改變時，也會重新 setTodolistData
    let newTodolistData = await getCurrentTodolistData();
    setTodolistData(newTodolistData);
    // console.log('useEffect depends on isSignIn');
  }, [isSignIn]);

  useEffect(() => {
    // 當 todolistData 更改，便會更改 currentListId
    const getCurrentListId = () => (srcCurrentListId.current);
    setCurrentListId(getCurrentListId());
    
    // console.log('todolistData: ', todolistData);
    // console.log('srcCurrentListId.current: ', srcCurrentListId.current);
    // console.log('useEffect depends on todolistData');
  }, [todolistData]);

  useEffect(() => {
    // console.log('useEffect depends on currentListId');
    // console.log('currentListData.current: ', currentListData.current);
    // console.log('currentListId: ', currentListId);
    // console.log('----------');
  }, [currentListId]);

  let history = useHistory();
  const handleTableItemClick = async (value) => {
    currentListData.current = value;
    await setCurrentListId(value.id);
    history.push(`/todolist`);
  }

  return (
    <StyledTodolistPages>
      {
        // 判斷登入與否
        (!(isSignIn)) ? (
          // 未登入
          // 判斷螢幕尺寸
          (windowWidth <= breakpoint) ? (
            <Switch>                                  
              <Route path="/todolist/table">
                <TodolistTable isSignIn={false} />
              </Route>
              <Route exact path="/todolist/id/">
                <Todolist isSignIn={false} />
              </Route>  
              <Redirect from="/todolist" to={"/todolist/id/"} />
            </Switch>            
          ) : (
            <Switch>
              <Route exact path="/todolist/id/">
                <TodolistTable isSignIn={false} />
                <Todolist isSignIn={false} />  
              </Route>
              <Redirect from="/todolist" to="/todolist/id/" />                   
            </Switch>          
          )
        ) : (
          // 有登入
          (windowWidth <= breakpoint) ? (
            <Switch>                      
              <Route exact path="/todolist/id/:listId">
                <Todolist isSignIn={true} currentListData={currentListData.current} currentListId={currentListId} />
              </Route>                                  
              <Route exact path="/todolist/table">
                <TodolistTable onTableItemClick={handleTableItemClick} isSignIn={true} srcTodolistData={todolistData} />
              </Route>
              <Redirect from="/todolist" to={`/todolist/id/${currentListId}`} />
            </Switch>            
          ) : (
            <Switch>
              <Route path="/todolist/id/:listId">
                <TodolistTable onTableItemClick={handleTableItemClick} isSignIn={true} srcTodolistData={todolistData} />
                <Todolist isSignIn={true} currentListData={currentListData.current} currentListId={currentListId} />
              </Route>                      
              <Redirect from="/todolist/table" to={`/todolist/id/${currentListId}`} />
              <Redirect from="/todolist" to={`/todolist/id/${currentListId}`} />
            </Switch>          
          )          
        )
      }
    </StyledTodolistPages>
  )
}

const StyledHome = styled.div`

`;


const Home = () => {
  return (
    <StyledHome>
      <p>This is Home.</p>
    </StyledHome>
  )
}

const StyledMain = styled.main`
  position: relative;
  padding: ${styledVariables.shared.barHeight} 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Main = () => {
  // 處理視窗大小變化
  let [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    let isResizeEventFired = false;
    window.addEventListener('resize', function() {
      if (!(isResizeEventFired)) {
        isResizeEventFired = true;
        setWindowWidth(window.innerWidth);
        // console.log('window.innerWidth: ', window.innerWidth);
        isResizeEventFired = false;
      }
    })
  }, [])

  // 處理登入狀態
  // let [isSignIn, setIsSignIn] = useState(null);
  let [isSignIn, setIsSignIn] = useState('kqXYsHFzzTN0DGlBqFdyafGtU052');

    // test data
    let userInfoA = {
        email: 'jeffery84115@gmail.com',
        password: 'haoyuliao',
    }
    let userInfoB = {
        email: 'trial@gmail.com',
        password: 'trialtrial',
    }
    let userTest = userInfoA;

  let [emailValue, setEmailValue] = useState(userTest.email);
  let [passwordValue, setPasswordValue] = useState(userTest.password);
  // let currentUser = useRef(null);
  useEffect(() => {
    // console.log('isSignIn after rendering Main: ', isSignIn);
    // console.log('currentUser when render Main: ', currentUser.current);
  }, [isSignIn]);

  const onAuthEmailInput = (value) => {
      setEmailValue(value);
  }

  const onAuthPasswordInput = (value) => {
      setPasswordValue(value);
  }

  const onAuthSubmit = async (emailValue, passwordValue) => {
    // console.log('trigger submit event');

    let signInResult = await auth.signInWithEmailAndPassword(
        emailValue,
        passwordValue
    );
    if (!signInResult) {
        // 顯示 sign in 失敗 modal
        // console.log('Fail to sign in');
        // currentUser.current = null;
        setIsSignIn(false);
            
        return
    }

    // 顯示 sign in 成功 modal
    // console.log('Successfully sign in', 'signInResult: ', signInResult, 'type of signInResult: ', typeof(signInResult));
    // console.log(auth.currentUser);
    // currentUser.current = signInResult.user;
    setIsSignIn(signInResult.user.uid);
  }

  return (
    <StyledMain>
      <Switch>
        <Route path="/todolist">
          <TodolistPages isSignIn={isSignIn} windowWidth={windowWidth} />
        </Route>
        <Route path="/auth">
          <Auth isSignIn={isSignIn} onAuthSubmit={onAuthSubmit} onAuthEmailInput={onAuthEmailInput} emailValue={emailValue} onAuthPasswordInput={onAuthPasswordInput} passwordValue={passwordValue} />
        </Route>
        <Route path="/">
          <Home />
        </Route>        
      </Switch>
    </StyledMain>
  )
}

const StyledApp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

function App() {
  let testData = {
    user: {
      email: 'jeffery84115@gmail.com',
      password: 'haoyuliao'
    }
  }
  useEffect(async () => {
  }) 

  return (
    <Router>
      <StyledApp>
        <NavBar />
        <Main />
        <ToolBar />
        <TabBar />
      </StyledApp>      
    </Router>
  );
}

export default App;