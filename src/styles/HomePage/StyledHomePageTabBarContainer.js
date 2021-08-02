import styled from '@emotion/styled/macro';
import { styledVariables, removePx } from '../app/cssMaterial';

const StyledHomePageTabBarContainer = styled.div`
  position: fixed;
  bottom: ${({ visibility, windowOffset, scrollOffset, isScrollEnd }) => {
    if (visibility === 2) {
      return '0';
    }
    const barHeight = removePx(styledVariables.shared.barHeight);
    // console.log('windowOffset: ', windowOffset);
    if (windowOffset === 0) {
      return `${-barHeight}px`;
    }
    if (windowOffset > 0 && isScrollEnd) {
      return '0';
    }
    if (Math.abs(scrollOffset) < removePx(styledVariables.HomePage.welcomingHeight) * 0.75) {
      return `${-barHeight}px`;
    }
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
  z-index: 5;
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
    background-color: ${({ backgroundColor }) => backgroundColor};
  }

  > * {
    width: 100%;
    height: 100%;
  }
`;

export default StyledHomePageTabBarContainer;
