/* eslint-disable no-nested-ternary */
import { React } from 'react';
import StyledHomePageNavBarContainer from '../../styles/HomePage/StyledHomePageNavBarContainer';

const HomePageNavBarContainer = ({ scrollOffsetInfo, navBarState, scrollContent }) => {
  const { content, visibility } = navBarState;
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
    <StyledHomePageNavBarContainer
      visibility={visibility}
      windowOffset={windowOffset}
      scrollOffset={scrollOffset}
      isScrollEnd={isScrollEnd}
      scrollContent={scrollContent}
      // className={`${visibility ? '' : 'vb-hidden'} ${
      //   windowOffset < 0 || isScrollEnd ? 'transition' : ''
      // }`}
      className={`${visibility ? '' : 'vb-hidden'} transition`}
    >
      {content}
    </StyledHomePageNavBarContainer>
  );
};

export default HomePageNavBarContainer;
