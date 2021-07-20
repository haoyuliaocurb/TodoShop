import { React } from 'react';
import StyledTabBar from '../../styles/app/StyledTabBar';

const TabBar = ({ pageYOffsetInfo, tabBarState }) => {
  const { content, visibility } = tabBarState;
  const { prePageYOffset, pageYOffset } = pageYOffsetInfo;
  // console.log('prePageYOffset: ', prePageYOffset, 'pageYOffset: ', pageYOffset);
  const windowOffset = pageYOffset - prePageYOffset;
  return (
    <StyledTabBar
      windowOffset={windowOffset}
      pageYOffset={pageYOffset}
      className={`${visibility ? '' : 'vb-hidden'} ${windowOffset < 0 ? 'transition' : ''}`}
    >
      {content}
    </StyledTabBar>
  );
};

export default TabBar;
