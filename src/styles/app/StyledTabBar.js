import styled from '@emotion/styled/macro';
import { styledVariables, removePx } from './cssMaterial';

const StyledTabBar = styled.div`
  position: fixed;
  bottom: ${({ windowOffset, scrollOffset, isScrollEnd }) => {
    const barHeight = removePx(styledVariables.shared.barHeight);
    // console.log('windowOffset: ', windowOffset);
    if (windowOffset <= 0 || isScrollEnd) {
      return '0';
    }
    if (Math.abs(scrollOffset) < barHeight) {
      // console.log(`${-scrollOffset}px`);
      return `${-scrollOffset}px`;
    }
    // console.log(`${0 - barHeight}px`);
    return `${-barHeight}px`;
  }};
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  display: flex;
  justify-content: center;
  align-items: center;

  &.transition {
    transition-property: bottom;
    transition-duration: 0.5s;
  }

  ::before {
    display: inline-block;
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: ${styledVariables.color.white};
  }

  > * {
    width: 100%;
    height: 100%;
  }
`;

export default StyledTabBar;
