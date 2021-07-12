// script
import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { auth } from '../utils/firebase/firebase-services';

import IconApp from '../styles/app/IconApp';
import TodolistPage from '../pages/TodolistPage';
import AuthPage from '../pages/AuthPage';
import SearchPage from '../pages/SearchPage';

// styling
import 'normalize.css';
import '../styles/app/general.css';
import {
  StyledNavBar,
  StyledTabBar,
  StyledIconApp,
  StyledToolBar,
  StyledMain,
  StyledHome,
  StyledApp,
} from '../styles/app/StyledAppComps';

/*
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
*/

const NavBar = () => {
  return (
    <StyledNavBar>
      <Link to="/todolist/table">
        <IconApp.ChevronLeft />
      </Link>
      <h1>您的購物清單</h1>
      <button type="submit">管理</button>
    </StyledNavBar>
  );
};

const TabBar = () => {
  const getNewIconState = (targetId) => {
    const iconInitState = {
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
      },
    };

    if (!targetId) {
      return iconInitState;
    }
    const newIconState = {
      disabled: { ...iconInitState.disabled },
      active: { ...iconInitState.active },
    };
    newIconState.active[targetId] = true;

    return newIconState;
  };

  const [iconState, setIconState] = useState(() => getNewIconState());

  const handleIconClick = (e) => {
    e.stopPropagation();
    const targetId = e.currentTarget.id;
    // console.log('targetId: ', targetId);
    setIconState(getNewIconState(targetId));
  };

  useEffect(() => {
    setIconState(getNewIconState('home'));
  }, []);

  useEffect(() => {
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
  );
};

const ToolBar = () => {
  return (
    <StyledToolBar>
      <button type="button" className="buttonAddTodolist">
        新增購物清單 +
      </button>
    </StyledToolBar>
  );
};

const Home = () => {
  return (
    <StyledHome>
      <p>This is Home.</p>
    </StyledHome>
  );
};

const Main = () => {
  // 處理視窗大小變化
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    let isResizeEventFired = false;
    window.addEventListener('resize', () => {
      if (!isResizeEventFired) {
        isResizeEventFired = true;
        setWindowWidth(window.innerWidth);
        // console.log('window.innerWidth: ', window.innerWidth);
        isResizeEventFired = false;
      }
    });
  }, []);

  // 處理登入狀態
  // let [isSignIn, setIsSignIn] = useState(null);
  const [isSignIn, setIsSignIn] = useState('kqXYsHFzzTN0DGlBqFdyafGtU052');

  // test data
  const userInfoA = {
    email: 'jeffery84115@gmail.com',
    password: 'haoyuliao',
  };
  // const userInfoB = {
  //   email: 'trial@gmail.com',
  //   password: 'trialtrial',
  // };
  const userTest = userInfoA;

  const [emailValue, setEmailValue] = useState(userTest.email);
  const [passwordValue, setPasswordValue] = useState(userTest.password);
  // let currentUser = useRef(null);
  useEffect(() => {
    // console.log('isSignIn after rendering Main: ', isSignIn);
    // console.log('currentUser when render Main: ', currentUser.current);
  }, [isSignIn]);

  const onAuthEmailInput = (value) => {
    setEmailValue(value);
  };

  const onAuthPasswordInput = (value) => {
    setPasswordValue(value);
  };

  const onAuthSubmit = async (emailValueInput, passwordValueInput) => {
    // console.log('trigger submit event');

    const signInResult = await auth.signInWithEmailAndPassword(emailValueInput, passwordValueInput);
    if (!signInResult) {
      // 顯示 sign in 失敗 modal
      // console.log('Fail to sign in');
      // currentUser.current = null;
      setIsSignIn(false);

      return;
    }

    // 顯示 sign in 成功 modal
    // console.log('Successfully sign in', 'signInResult: ', signInResult, 'type of signInResult: ', typeof(signInResult));
    // console.log(auth.currentUser);
    // currentUser.current = signInResult.user;
    setIsSignIn(signInResult.user.uid);
  };

  return (
    <StyledMain>
      <Switch>
        <Route path="/todolist">
          <TodolistPage isSignIn={isSignIn} windowWidth={windowWidth} />
        </Route>
        <Route path="/auth">
          <AuthPage
            isSignIn={isSignIn}
            onAuthSubmit={onAuthSubmit}
            onAuthEmailInput={onAuthEmailInput}
            emailValue={emailValue}
            onAuthPasswordInput={onAuthPasswordInput}
            passwordValue={passwordValue}
          />
        </Route>
        <Route path="/activity">
          <SearchPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </StyledMain>
  );
};

function App() {
  // const testData = {
  //   user: {
  //     email: 'jeffery84115@gmail.com',
  //     password: 'haoyuliao'
  //   },
  // };
  useEffect(() => {});

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
