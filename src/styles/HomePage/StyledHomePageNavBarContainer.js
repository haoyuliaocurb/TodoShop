import styled from '@emotion/styled/macro';
import { styledVariables, removePx } from '../app/cssMaterial';

const StyledHomePageNavBarContainer = styled.div`
  position: fixed;
  top: ${({ visibility, windowOffset, scrollOffset, isScrollEnd }) => {
    if (visibility === 2) {
      return '0';
    }
    const barHeight = removePx(styledVariables.shared.barHeight);
    // console.log('windowOffset: ', windowOffset);
    // console.log('scrollOffset: ', scrollOffset);
    if (windowOffset > 0 && isScrollEnd) {
      return '0';
    }
    if (Math.abs(scrollOffset) < removePx(styledVariables.HomePage.welcomingHeight) * 0.75) {
      return `${-barHeight}px`;
    }
    if (windowOffset <= 0 || isScrollEnd) {
      return '0';
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

  &.transition {
    transition-property: top;
    transition-duration: 0.5s;
  }
`;

export default StyledHomePageNavBarContainer;
