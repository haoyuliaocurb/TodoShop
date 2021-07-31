import { React } from 'react';

import StyledTabBar from '../../styles/app/StyledTabBar';
import { styledVariables } from '../../styles/app/cssMaterial';

const TabBar = ({ backgroundColor, scrollOffsetInfo, tabBarState }) => {
  const { content, visibility, topShadow } = tabBarState;
  // const { preScrollOffset, scrollOffset, isScrollEnd } = scrollOffsetInfo;
  const preScrollOffset = visibility !== 1 ? null : scrollOffsetInfo.preScrollOffset;
  const scrollOffset = visibility !== 1 ? null : scrollOffsetInfo.scrollOffset;
  const isScrollEnd = visibility !== 1 ? null : scrollOffsetInfo.isScrollEnd;
  // console.log('preScrollOffset: ', preScrollOffset, 'scrollOffset: ', scrollOffset);
  const windowOffset = visibility !== 1 ? null : scrollOffset - preScrollOffset;
  return (
    <StyledTabBar
      backgroundColor={!backgroundColor ? styledVariables.color.white : backgroundColor}
      visibility={visibility}
      windowOffset={windowOffset}
      scrollOffset={scrollOffset}
      isScrollEnd={isScrollEnd}
      topShadow={topShadow}
      // className={`${visibility ? '' : 'vb-hidden'} ${
      //   windowOffset < 0 || isScrollEnd ? 'transition' : ''
      // }`}
      className={`${visibility ? '' : 'vb-hidden'} transition`}
    >
      {content}
    </StyledTabBar>
  );
};

export default TabBar;
