import styled from '@emotion/styled/macro';
import { styledVariables, removePx } from './cssMaterial';

const StyledTabBar = styled.div`
  position: fixed;
  bottom: ${({ windowOffset, pageYOffset }) => {
    const barHeight = removePx(styledVariables.shared.barHeight);
    // console.log('windowOffset: ', windowOffset);
    if (windowOffset <= 0) {
      return '0';
    }
    if (Math.abs(pageYOffset) < barHeight) {
      console.log(`${-pageYOffset}px`);
      return `${-pageYOffset}px`;
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

  > * {
    width: 100%;
    height: 100%;
  }
`;

export default StyledTabBar;
