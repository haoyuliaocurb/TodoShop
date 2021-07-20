import { React } from 'react';

import StyledTabBar from '../../styles/app/StyledTabBar';
import { styledVariables } from '../../styles/app/cssMaterial';

const TabBar = ({ backgroundColor, scrollOffsetInfo, tabBarState }) => {
  const { content, visibility } = tabBarState;
  // const { preScrollOffset, scrollOffset, isScrollEnd } = scrollOffsetInfo;
  const preScrollOffset = visibility === 2 ? null : scrollOffsetInfo.preScrollOffset;
  const scrollOffset = visibility === 2 ? null : scrollOffsetInfo.scrollOffset;
  const isScrollEnd = visibility === 2 ? null : scrollOffsetInfo.isScrollEnd;
  // console.log('preScrollOffset: ', preScrollOffset, 'scrollOffset: ', scrollOffset);
  const windowOffset = visibility === 2 ? null : scrollOffset - preScrollOffset;
  return (
    <StyledTabBar
      backgroundColor={!backgroundColor ? styledVariables.color.white : backgroundColor}
      visibility={visibility}
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
