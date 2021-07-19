import { React, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { auth, firestore, firebase } from '../../utils/firebase/firebase-services';
import TodolistPage from '../../pages/TodolistPage';
import AuthPage from '../../pages/AuthPage';
import SearchPage from '../../pages/SearchPage';
import HomePage from '../../pages/HomePage';

// styling
import StyledMain from '../../styles/app/StyledMain';

const setSearchKeywordsLog = async (isSignInValue, keywordsValue, sourceValue) => {
  await firestore.collection('users').doc(isSignInValue).collection('searchKeywordsLog').add({
    updateTime: firebase.firestore.Timestamp.now(),
    source: sourceValue,
    keywords: keywordsValue,
  });
  // console.log('complete setSearchKeywordsLog');
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
  // eslint-disable-next-line no-unused-vars
  const [isSignIn, setIsSignIn] = useState(null);
  // const [isSignIn, setIsSignIn] = useState('kqXYsHFzzTN0DGlBqFdyafGtU052');

  useEffect(() => {
    // console.log('isSignIn after rendering Main: ', isSignIn);
    // console.log('currentUser when render Main: ', currentUser.current);
  }, [isSignIn]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log('trigger onAuthStateChanged');
      // console.log('user: ', user);
      if (!user) {
        setIsSignIn(false);
        return;
        // console.log('setIsSignIn(false)');
      }
      setIsSignIn(user.uid);
      // console.log('setIsSignIn(user.uid)');
    });
  }, []);

  // SearchPage 搜尋資訊
  // eslint-disable-next-line no-unused-vars
  const handleIcon2SearchClick = (keywordsValue, sourceValue) => {
    console.log('trigger handleIcon2SearchClick');
    setSearchKeywordsLog(isSignIn, keywordsValue, sourceValue);
  };

  return (
    <StyledMain>
      <Switch>
        <Route path="/todolist">
          <TodolistPage
            isSignIn={isSignIn}
            windowWidth={windowWidth}
            handleIcon2SearchClick={handleIcon2SearchClick}
          />
        </Route>
        <Route path="/auth">
          <AuthPage isSignIn={isSignIn} />
        </Route>
        <Route path="/activity">
          <SearchPage isSignIn={isSignIn} />
        </Route>
        <Route path="/search">
          <SearchPage isSignIn={isSignIn} />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </StyledMain>
  );
};

export default Main;
