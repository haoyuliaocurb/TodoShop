// script
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconApp from '../../styles/app/IconApp';

// styling
import StyledTabBar from '../../styles/app/StyledTabBar';
import { StyledIconApp } from '../../styles/app/StyledAppComps';

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

export default TabBar;
