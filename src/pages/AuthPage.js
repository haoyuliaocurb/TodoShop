/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { auth, uiConfig, StyledFirebaseAuth, firebase } from '../utils/firebase/firebase-services';
// import { auth } from '../utils/firebase/firebase-services';

import StyledAuthPage from '../styles/AuthPage/StyledAuthPage';
import TabBar from '../components/app/TabBar';
import GeneralTabBar from '../components/app/GeneralTabBar';
import NavBar from '../components/app/NavBar';
import SimpleNavBar from '../components/shared/SimpleNavBar';
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

const AuthPage = ({ isSignIn }) => {
  // eslint-disable-next-line no-unused-vars
  // console.log('isSignIn: ', isSignIn);
  const [configNavBar, setConfigNavBar] = useState({
    title: '',
    buttonName: null,
    handleButtonClick: null,
  });
  const updateConfigNavBar = (newConfigNavBar) => {
    setConfigNavBar((preConfigNavBar) => {
      return {
        ...preConfigNavBar,
        ...newConfigNavBar,
      };
    });
  };
  const INIT_BARSTATE = {
    navBar: {
      content: (
        <SimpleNavBar
          title={configNavBar.title}
          buttonName={configNavBar.buttonName}
          handleButtonClick={configNavBar.handleButtonClick}
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
      content: null,
      visibility: 2,
    },
  };
  const [barState, setBarState] = useState(INIT_BARSTATE);
  useEffect(() => {
    setBarState({
      ...INIT_BARSTATE,
    });
  }, [configNavBar]);
  return (
    <StyledAuthPage>
      <NavBar backgroundColor={styledVariables.color.gray100} navBarState={barState.navBar} />
      {!isSignIn ? (
        <Switch>
          <Route exact path="/auth/signIn">
            <SignIn isSignIn={isSignIn} updateConfigNavBar={updateConfigNavBar} />
          </Route>
          <Redirect from="/auth" to="/auth/signIn" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/auth/uid/:uid">
            <User isSignIn={isSignIn} updateConfigNavBar={updateConfigNavBar} />
          </Route>
          <Redirect from="/auth" to={`/auth/uid/${isSignIn}/orders`} />
        </Switch>
      )}
      <TabBar backgroundColor={styledVariables.color.gray100} tabBarState={barState.tabBar} />
    </StyledAuthPage>
  );
};

export default AuthPage;
