/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { auth, uiConfig, StyledFirebaseAuth, firebase } from '../utils/firebase/firebase-services';
// import { auth } from '../utils/firebase/firebase-services';

import StyledAuthPage from '../styles/AuthPage/StyledAuthPage';
import TabBar from '../components/app/TabBar';
import GeneralTabBar from '../components/app/GeneralTabBar';
import SignIn from '../components/AuthPage/SignIn';
import User from '../components/AuthPage/User';
import { styledVariables } from '../styles/app/cssMaterial';

const USER_INFO_A = {
  email: 'jeffery84115@gmail.com',
  password: 'haoyuliao',
};
const USER_INFO_B = {
  email: 'trial@gmail.com',
  password: 'trialtrial',
};
const USER_INFO_TEST = USER_INFO_A;

const INIT_BARSTATE = {
  navBar: {
    content: null,
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
    content: null,
    visibility: 2,
  },
};

const AuthPage = ({ isSignIn }) => {
  // eslint-disable-next-line no-unused-vars
  // console.log('isSignIn: ', isSignIn);
  const [barState, setBarState] = useState(INIT_BARSTATE);
  // const history = useHistory();
  // const [emailValue, setEmailValue] = useState(USER_INFO_TEST.email);
  // const [passwordValue, setPasswordValue] = useState(USER_INFO_TEST.password);
  // let currentUser = useRef(null);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log('trigger submit');
  //   auth.signInWithEmailAndPassword(emailValue, passwordValue);
  // };

  // const handleEmailInput = (e) => {
  //   setEmailValue(e.target.value);
  // };

  // const handlePasswordInput = (e) => {
  //   setPasswordValue(e.target.value);
  // };
  return (
    <StyledAuthPage>
      {!isSignIn ? (
        <Switch>
          <Route exact path="/auth/signIn">
            <SignIn isSignIn={isSignIn} />
          </Route>
          <Redirect from="/auth" to="/auth/signIn" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/auth/uid/:uid">
            <User isSignIn={isSignIn} />
          </Route>
          <Redirect from="/auth" to={`/auth/uid/${isSignIn}`} />
        </Switch>
      )}
      <TabBar backgroundColor={styledVariables.color.gray100} tabBarState={barState.tabBar} />
    </StyledAuthPage>
  );
};

export default AuthPage;
