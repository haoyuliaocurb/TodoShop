import styled from '@emotion/styled/macro';
import { styledVariables, removePx } from './cssMaterial';

const StyledToolBar = styled.div`
  position: fixed;
  bottom: ${({ visibility, windowOffset, scrollOffset, isScrollEnd }) => {
    if (visibility === 2) {
      return styledVariables.shared.barHeight;
    }
    const barHeight = removePx(styledVariables.shared.barHeight);
    // console.log('windowOffset: ', windowOffset);
    if (windowOffset <= 0 || isScrollEnd) {
      return styledVariables.shared.barHeight;
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
  z-index: 5;
  /* border: solid black 1px; */
  box-shadow: ${({ topShadow }) => {
    if (!topShadow) {
      return 'none';
    }
    return '0 -5px 10px rgba(0, 0, 0, 0.1)';
  }};

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
    // background-color: ${styledVariables.color.white};
  }

  > * {
    width: 100%;
    height: 100%;
  }
`;

export default StyledToolBar;
