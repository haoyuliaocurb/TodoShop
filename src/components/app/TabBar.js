import { React } from 'react';
import StyledTabBar from '../../styles/app/StyledTabBar';

const TabBar = ({ scrollOffsetInfo, tabBarState }) => {
  const { content, visibility } = tabBarState;
  const { preScrollOffset, scrollOffset, isScrollEnd } = scrollOffsetInfo;
  // console.log('preScrollOffset: ', preScrollOffset, 'scrollOffset: ', scrollOffset);
  const windowOffset = scrollOffset - preScrollOffset;
  return (
    <StyledTabBar
      windowOffset={windowOffset}
      scrollOffset={scrollOffset}
      isScrollEnd={isScrollEnd}
      className={`${visibility ? '' : 'vb-hidden'} ${
        windowOffset < 0 || isScrollEnd ? 'transition' : ''
      }`}
    >
      {content}
    </StyledTabBar>
  );
};

export default TabBar;
