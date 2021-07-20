/* eslint-disable no-unused-vars */
// script
import { React } from 'react';
// import { React, useState, useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import { auth } from '../utils/firebase/firebase-services';

import Main from '../components/app/Main';
// import NavBar from '../components/app/NavBar';
// import TabBar from '../components/app/TabBar';
// import ToolBar from '../components/app/ToolBar';
// import GeneralTabBar from '../components/app/GeneralTabBar';
// import TodolistPageToolBar from '../components/TodolistPage/TodolistPageToolBar';

// styling
import 'normalize.css';
import '../styles/app/general.css';
import StyledAppContent from '../styles/app/StyledAppContent';

const INIT_BARSTATE_TRIAL = {
  navBar: true,
  toolBar: true,
  tabBar: true,
};

const INIT_BARSTATE = {
  navBar: {
    content: null,
    visibility: 0,
  },
  toolBar: {
    content: null,
    visibility: 0,
  },
  tabBar: {
    content: null,
    visibility: 0,
  },
};

function AppContent() {
  // const [barStateTrial, setBarStateTrial] = useState(INIT_BARSTATE_TRIAL);
  // const [barState, setBarState] = useState(INIT_BARSTATE);
  // const { navBar: navBarState, toolBar: toolBarState, tabBar: tabBarState } = barState;
  // const isUpdateSearchPageBarState = useRef(false);
  // const handleTabBarSearchTabClick = () => {
  //   setBarStateTrial({ ...INIT_BARSTATE_TRIAL, navBar: false, toolBar: false });
  // };
  // const handleTabBarHomeTabClick = () => {
  //   setBarStateTrial({ ...INIT_BARSTATE_TRIAL });
  // };
  // const handleTabBarActivityTabClick = () => {
  //   setBarStateTrial({ ...INIT_BARSTATE_TRIAL });
  // };
  // const handleTabBarCartTabClick = () => {
  //   setBarStateTrial({ ...INIT_BARSTATE_TRIAL });
  // };
  // const handleTabBarAuthTabClick = () => {
  //   setBarStateTrial({ ...INIT_BARSTATE_TRIAL });
  // };
  // const handleTabBarListTabClick = () => {
  //   setBarStateTrial({ ...INIT_BARSTATE_TRIAL });
  // };

  // const GENERAL_TABBARSTATE = {
  //   tabBar: {
  //     content: (
  //       <GeneralTabBar
  //         handleTabBarSearchTabClick={handleTabBarSearchTabClick}
  //         handleTabBarHomeTabClick={handleTabBarHomeTabClick}
  //         handleTabBarActivityTabClick={handleTabBarActivityTabClick}
  //         handleTabBarCartTabClick={handleTabBarCartTabClick}
  //         handleTabBarAuthTabClick={handleTabBarAuthTabClick}
  //         handleTabBarListTabClick={handleTabBarListTabClick}
  //       />
  //     ),
  //     visibility: 1,
  //   },
  // };

  // const updateSearchPageBarState = (content, isUpdateSearchPageBarStateValue) => {
  //   if (isUpdateSearchPageBarState) {
  //     return;
  //   }
  //   isUpdateSearchPageBarState.current = isUpdateSearchPageBarStateValue;
  //   setBarState({
  //     ...INIT_BARSTATE,
  //     ...GENERAL_TABBARSTATE,
  //     navBar: {
  //       content,
  //       visibility: 1,
  //     },
  //     toolBar: {
  //       content: null,
  //       visibility: 1,
  //     },
  //   });
  // };

  // const location = useLocation().pathname;
  // const getLocationArray = (srcLocation) => srcLocation.split('/');
  // useEffect(() => {
  //   const locationArray = getLocationArray(location);
  //   switch (locationArray[1]) {
  //     case 'activity':
  //       setBarStateTrial({ ...INIT_BARSTATE_TRIAL, navBar: false, toolBar: false });
  //       break;
  //     case 'cart':
  //       setBarStateTrial({ ...INIT_BARSTATE_TRIAL });
  //       break;
  //     case 'auth':
  //       setBarStateTrial({ ...INIT_BARSTATE_TRIAL });
  //       break;
  //     case 'todolist':
  //       setBarState({
  //         ...INIT_BARSTATE,
  //         ...GENERAL_TABBARSTATE,
  //         toolBar: {
  //           content: <TodolistPageToolBar />,
  //           visibility: 1,
  //         },
  //       });
  //       break;
  //     default:
  //       setBarState({
  //         ...INIT_BARSTATE,
  //         ...GENERAL_TABBARSTATE,
  //         toolBar: {
  //           content: <TodolistPageToolBar />,
  //           visibility: 1,
  //         },
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   // console.log('barState: ', barState);
  // }, [barStateTrial]);

  // useEffect(() => {
  //   console.log('barState: ', barState);
  //   isUpdateSearchPageBarState.current = false;
  // }, [barState]);

  return (
    <StyledAppContent>
      <Main />
    </StyledAppContent>
  );
}

export default AppContent;
