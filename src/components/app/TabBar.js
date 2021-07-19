// script
import { React, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import IconApp from '../../styles/app/IconApp';

// styling
import StyledTabBar from '../../styles/app/StyledTabBar';
import { StyledIconApp } from '../../styles/app/StyledAppComps';

const INIT_ICONSTATE = {
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

const TabBar = ({
  pageYOffsetInfo,
  tabBarState,
  handleTabBarSearchTabClick,
  handleTabBarHomeTabClick,
  handleTabBarCartTabClick,
  handleTabBarAuthTabClick,
  handleTabBarListTabClick,
}) => {
  const getNewIconState = (targetId) => {
    if (!targetId) {
      return INIT_ICONSTATE;
    }
    const newIconState = {
      disabled: { ...INIT_ICONSTATE.disabled },
      active: { ...INIT_ICONSTATE.active },
    };
    // console.log('before: newIconState.active: ', newIconState.active);
    newIconState.active[targetId] = true;
    // console.log('after: newIconState.active: ', newIconState.active);

    return newIconState;
  };

  const [iconState, setIconState] = useState(() => getNewIconState());

  const handleSearchTabClick = (e) => {
    const targetId = e.currentTarget.id;
    // console.log('targetId: ', targetId);
    handleTabBarSearchTabClick();
    setIconState(getNewIconState(targetId));
  };

  const handleHomeTabClick = (e) => {
    const targetId = e.currentTarget.id;
    // console.log('targetId: ', targetId);
    handleTabBarHomeTabClick();
    setIconState(getNewIconState(targetId));
  };

  /*
  const handleActivityTabClick = (e) => {
    const targetId = e.currentTarget.id;
    // console.log('targetId: ', targetId);
    handleActivityTabClick();
    setIconState(getNewIconState(targetId));
  };
  */

  const handleCartTabClick = (e) => {
    const targetId = e.currentTarget.id;
    // console.log('targetId: ', targetId);
    handleTabBarCartTabClick();
    setIconState(getNewIconState(targetId));
  };

  const handleAuthTabClick = (e) => {
    const targetId = e.currentTarget.id;
    // console.log('targetId: ', targetId);
    handleTabBarAuthTabClick();
    setIconState(getNewIconState(targetId));
  };

  const handleListTabClick = (e) => {
    const targetId = e.currentTarget.id;
    // console.log('targetId: ', targetId);
    handleTabBarListTabClick();
    setIconState(getNewIconState(targetId));
  };

  const location = useLocation().pathname;
  const getLocationArray = (srcLocation) => srcLocation.split('/');
  useEffect(() => {
    const locationArray = getLocationArray(location);
    switch (locationArray[1]) {
      case 'home':
        setIconState(getNewIconState('home'));
        break;
      case 'activity':
        setIconState(getNewIconState('activity'));
        break;
      case 'cart':
        setIconState(getNewIconState('cart'));
        break;
      case 'auth':
        setIconState(getNewIconState('auth'));
        break;
      case 'todolist':
        setIconState(getNewIconState('list'));
        break;
      default:
        setIconState(getNewIconState('home'));
    }
  }, []);

  useEffect(() => {
    // console.log('new iconState: ', iconState);
  }, [iconState]);

  return (
    <StyledTabBar pageYOffsetInfo={pageYOffsetInfo} className={tabBarState ? '' : 'vb-hidden'}>
      <Link to="/" id="home" onClick={handleHomeTabClick}>
        <StyledIconApp disabled={iconState.disabled.home} active={iconState.active.home}>
          <IconApp.Home />
          <p className="textIcon">首頁</p>
        </StyledIconApp>
      </Link>
      <Link to="/activity" id="activity" onClick={handleSearchTabClick}>
        <StyledIconApp disabled={iconState.disabled.activity} active={iconState.active.activity}>
          <IconApp.Activity />
          <p className="textIcon">優惠活動</p>
        </StyledIconApp>
      </Link>
      <Link to="/cart" id="cart" onClick={handleCartTabClick}>
        <StyledIconApp disabled={iconState.disabled.cart} active={iconState.active.cart}>
          <IconApp.Cart />
          <p className="textIcon">購物車</p>
        </StyledIconApp>
      </Link>
      <Link to="/auth" id="auth" onClick={handleAuthTabClick}>
        <StyledIconApp disabled={iconState.disabled.auth} active={iconState.active.auth}>
          <IconApp.Auth />
          <p className="textIcon">我的帳號</p>
        </StyledIconApp>
      </Link>
      <Link to="/todolist" id="list" onClick={handleListTabClick}>
        <StyledIconApp disabled={iconState.disabled.list} active={iconState.active.list}>
          <IconApp.List />
          <p className="textIcon">購物清單</p>
        </StyledIconApp>
      </Link>
    </StyledTabBar>
  );
};

export default TabBar;
