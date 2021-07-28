import { React } from 'react';
import StyledToolBar from '../../styles/app/StyledToolBar';

const ToolBar = ({ scrollOffsetInfo, toolBarState }) => {
  const { content, visibility, topShadow } = toolBarState;
  // const { preScrollOffset, scrollOffset, isScrollEnd } = scrollOffsetInfo;
  const preScrollOffset = visibility !== 1 ? null : scrollOffsetInfo.preScrollOffset;
  const scrollOffset = visibility !== 1 ? null : scrollOffsetInfo.scrollOffset;
  const isScrollEnd = visibility !== 1 ? null : scrollOffsetInfo.isScrollEnd;
  // console.log('preScrollOffset: ', preScrollOffset, 'scrollOffset: ', scrollOffset);
  const windowOffset = visibility !== 1 ? null : scrollOffset - preScrollOffset;
  return (
    <StyledToolBar
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
    </StyledToolBar>
  );
};

export default ToolBar;
