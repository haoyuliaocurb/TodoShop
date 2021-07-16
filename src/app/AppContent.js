// script
import { React, useState, useEffect } from 'react';
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
  const { navBar: navBarState, toolBar: toolBarState, tabBar: tabBarState } = barState;
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

  return (
    <StyledAppContent>
      <NavBar navBarState={navBarState} />
      <Main />
      <ToolBar toolBarState={toolBarState} />
      <TabBar
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