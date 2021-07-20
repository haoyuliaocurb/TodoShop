/* eslint-disable no-unused-vars */
import { React } from 'react';
import { Link } from 'react-router-dom';
import IconApp from '../../styles/app/IconAppContent';
import StyledNavBar from '../../styles/app/StyledNavBar';

const NavBar = ({ scrollOffsetInfo, navBarState }) => {
  const { content, visibility } = navBarState;
  const { preScrollOffset, scrollOffset, isScrollEnd } = scrollOffsetInfo;
  // console.log('preScrollOffset: ', preScrollOffset, 'scrollOffset: ', scrollOffset);
  const windowOffset = scrollOffset - preScrollOffset;
  return (
    <StyledNavBar
      windowOffset={windowOffset}
      scrollOffset={scrollOffset}
      isScrollEnd={isScrollEnd}
      className={`${visibility ? '' : 'vb-hidden'} ${
        windowOffset < 0 || isScrollEnd ? 'transition' : ''
      }`}
    >
      {content}
    </StyledNavBar>
  );
};

export default NavBar;

/*
  <Link to="/todolist/table">
    <IconApp.ChevronLeft />
  </Link>
*/
