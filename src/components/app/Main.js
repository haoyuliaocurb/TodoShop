/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { auth, firestore, firebase } from '../../utils/firebase/firebase-services';
import TodolistPage from '../../pages/TodolistPage';
import AuthPage from '../../pages/AuthPage';
import SearchPage from '../../pages/SearchPage';
import HomePage from '../../pages/HomePage';
import CartPage from '../../pages/CartPage';
import ProductPage from '../../pages/ProductPage';

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
  // eslint-disable-next-line no-unused-vars
  const [isSignIn, setIsSignIn] = useState(null);
  const history = useHistory();
  const location = useLocation();
  // const [isSignIn, setIsSignIn] = useState('kqXYsHFzzTN0DGlBqFdyafGtU052');

  useEffect(() => {
    const unsubscribeOnAuthStateChanged = auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsSignIn(false);
        return;
        // console.log('setIsSignIn(false)');
      }
      setIsSignIn(user.uid);
    });
    return () => {
      unsubscribeOnAuthStateChanged();
    };
  }, []);

  useEffect(() => {
    const isAskedForward2SignIn = Number(
      window.localStorage.getItem('TodoShopIsAskedForward2SignIn'),
    );
    if (!isAskedForward2SignIn) {
      return;
    }
    window.localStorage.removeItem('TodoShopIsAskedForward2SignIn');
    history.go(-1);
  }, [isSignIn]);

  return (
    <StyledMain>
      <Switch>
        <Route path="/todolist">
          <TodolistPage isSignIn={isSignIn} windowWidth={windowWidth} />
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
        <Route path="/cart">
          <CartPage isSignIn={isSignIn} />
        </Route>
        <Route path="/product/:pid">
          <ProductPage isSignIn={isSignIn} />
        </Route>
        <Route path="/">
          <HomePage isSignIn={isSignIn} />
        </Route>
      </Switch>
    </StyledMain>
  );
};

export default Main;
