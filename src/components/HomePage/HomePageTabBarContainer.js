/* eslint-disable no-nested-ternary */
import { React } from 'react';

import StyledHomePageTabBarContainer from '../../styles/HomePage/StyledHomePageTabBarContainer';
import { styledVariables } from '../../styles/app/cssMaterial';

const HomePageTabBarContainer = ({ backgroundColor, scrollOffsetInfo, tabBarState }) => {
  const { content, visibility, topShadow } = tabBarState;
  // const { preScrollOffset, scrollOffset, isScrollEnd } = scrollOffsetInfo;
  const preScrollOffset =
    visibility !== 1 ? null : !scrollOffsetInfo ? 0 : scrollOffsetInfo.preScrollOffset;
  const scrollOffset =
    visibility !== 1 ? null : !scrollOffsetInfo ? 0 : scrollOffsetInfo.scrollOffset;
  const isScrollEnd =
    visibility !== 1 ? null : !scrollOffsetInfo ? 0 : scrollOffsetInfo.isScrollEnd;
  // console.log('preScrollOffset: ', preScrollOffset, 'scrollOffset: ', scrollOffset);
  const windowOffset =
    // eslint-disable-next-line no-nested-ternary
    visibility !== 1
      ? null
      : !scrollOffset || !preScrollOffset
      ? 0
      : scrollOffset - preScrollOffset;
  return (
    <StyledHomePageTabBarContainer
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
    </StyledHomePageTabBarContainer>
  );
};

export default HomePageTabBarContainer;
