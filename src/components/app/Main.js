import { React, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { auth } from '../../utils/firebase/firebase-services';
import TodolistPage from '../../pages/TodolistPage';
import AuthPage from '../../pages/AuthPage';
import SearchPage from '../../pages/SearchPage';
import HomePage from '../../pages/HomePage';

// styling
import StyledMain from '../../styles/app/StyledMain';

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
          <HomePage />
        </Route>
      </Switch>
    </StyledMain>
  );
};

export default Main;
