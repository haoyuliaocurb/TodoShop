import { React } from 'react';
import StyledNavBar from '../../styles/app/StyledNavBar';

const NavBar = ({ scrollOffsetInfo, navBarState }) => {
  const { content, visibility } = navBarState;
  // const { preScrollOffset, scrollOffset, isScrollEnd } = scrollOffsetInfo;
  const preScrollOffset = visibility === 2 ? null : scrollOffsetInfo.preScrollOffset;
  const scrollOffset = visibility === 2 ? null : scrollOffsetInfo.scrollOffset;
  const isScrollEnd = visibility === 2 ? null : scrollOffsetInfo.isScrollEnd;
  // console.log('preScrollOffset: ', preScrollOffset, 'scrollOffset: ', scrollOffset);
  const windowOffset = visibility === 2 ? null : scrollOffset - preScrollOffset;
  return (
    <StyledNavBar
      visibility={visibility}
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
