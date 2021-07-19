/* eslint-disable no-unused-vars */
// script
import { React, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { auth } from '../utils/firebase/firebase-services';

import Main from '../components/app/Main';
import TabBar from '../components/app/TabBar';
import IconApp from '../styles/app/IconApp';

// styling
import 'normalize.css';
import '../styles/app/general.css';
import { StyledNavBar, StyledToolBar, StyledAppContent } from '../styles/app/StyledAppComps';

const NavBar = ({ navBarState }) => {
  return (
    <StyledNavBar className={navBarState ? '' : 'vb-hidden'}>
      <Link to="/todolist/table">
        <IconApp.ChevronLeft />
      </Link>
      <h1>您的購物清單</h1>
      <button type="submit">管理</button>
    </StyledNavBar>
  );
};

const ToolBar = ({ toolBarState }) => {
  return (
    <StyledToolBar className={toolBarState ? '' : 'vb-hidden'}>
      <button type="button" className="buttonAddTodolist">
        新增購物清單 +
      </button>
    </StyledToolBar>
  );
};

const INIT_BARSTATE = {
  navBar: true,
  toolBar: true,
  tabBar: true,
};

function AppContent() {
  const [barState, setBarState] = useState(INIT_BARSTATE);
  const [pageYOffsetInfo, setPageYOffsetInfo] = useState(0);
  const { navBar: navBarState, toolBar: toolBarState, tabBar: tabBarState } = barState;
  const isOnScroll = useRef(false);
  const prePageYOffset = useRef(0);
  const handleTabBarSearchTabClick = () => {
    setBarState({ ...INIT_BARSTATE, navBar: false, toolBar: false });
  };
  const handleTabBarHomeTabClick = () => {
    setBarState({ ...INIT_BARSTATE });
  };
  const handleTabBarActivityTabClick = () => {
    setBarState({ ...INIT_BARSTATE });
  };
  const handleTabBarCartTabClick = () => {
    setBarState({ ...INIT_BARSTATE });
  };
  const handleTabBarAuthTabClick = () => {
    setBarState({ ...INIT_BARSTATE });
  };
  const handleTabBarListTabClick = () => {
    setBarState({ ...INIT_BARSTATE });
  };

  const location = useLocation().pathname;
  const getLocationArray = (srcLocation) => srcLocation.split('/');
  useEffect(() => {
    const locationArray = getLocationArray(location);
    switch (locationArray[1]) {
      case 'home':
        setBarState({ ...INIT_BARSTATE });
        break;
      case 'activity':
        setBarState({ ...INIT_BARSTATE, navBar: false, toolBar: false });
        break;
      case 'cart':
        setBarState({ ...INIT_BARSTATE });
        break;
      case 'auth':
        setBarState({ ...INIT_BARSTATE });
        break;
      case 'todolist':
        setBarState({ ...INIT_BARSTATE });
        break;
      default:
        setBarState({ ...INIT_BARSTATE });
    }
  }, []);

  useEffect(() => {
    // console.log('barState: ', barState);
  }, [barState]);

  window.addEventListener('scroll', () => {
    if (isOnScroll.current) {
      return;
    }
    isOnScroll.current = true;
    const { pageYOffset } = window;
    const prePageYOffsetValue = prePageYOffset.current;
    prePageYOffset.current = pageYOffset;
    setPageYOffsetInfo({
      // eslint-disable-next-line object-shorthand
      prePageYOffset: prePageYOffsetValue,
      // eslint-disable-next-line object-shorthand
      pageYOffset: pageYOffset,
    });
  });

  useEffect(() => {
    isOnScroll.current = false;
    // console.log('pageYOffsetInfo: ', pageYOffsetInfo);
  }, [pageYOffsetInfo]);

  return (
    <StyledAppContent>
      <NavBar pageYOffsetInfo={pageYOffsetInfo} navBarState={navBarState} />
      <Main />
      <ToolBar pageYOffsetInfo={pageYOffsetInfo} toolBarState={toolBarState} />
      <TabBar
        pageYOffsetInfo={pageYOffsetInfo}
        handleTabBarSearchTabClick={handleTabBarSearchTabClick}
        handleTabBarHomeTabClick={handleTabBarHomeTabClick}
        handleTabBarActivityTabClick={handleTabBarActivityTabClick}
        handleTabBarCartTabClick={handleTabBarCartTabClick}
        handleTabBarAuthTabClick={handleTabBarAuthTabClick}
        handleTabBarListTabClick={handleTabBarListTabClick}
        tabBarState={tabBarState}
      />
    </StyledAppContent>
  );
}

export default AppContent;
