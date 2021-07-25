import styled from '@emotion/styled/macro';
import { styledVariables, removePx } from '../../app/cssMaterial';

const StyledFeatureBar = styled.div`
  position: absolute;
  top: ${({ visibility, windowOffset, scrollOffset, isScrollEnd }) => {
    if (visibility === 2) {
      return '0';
    }
    const barHeight = removePx(styledVariables.shared.barHeight);
    // console.log('windowOffset: ', windowOffset);
    if (windowOffset <= 0 || isScrollEnd) {
      return `${barHeight * 2}px`;
    }
    if (Math.abs(scrollOffset) < barHeight) {
      // console.log(`${-scrollOffset}px`);
      return `${-scrollOffset * 1.5 + barHeight}px`;
    }
    // console.log(`${0 - barHeight}px`);
    return `${-barHeight}px`;
  }};
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  // border: black solid 1px;
  overflow-x: scroll;
  display: flex;
  align-items: center;
  background-color: ${styledVariables.color.white};
  z-index: 3;

  &.transition {
    transition-property: top;
    transition-duration: 0.5s;
  }
`;

export default StyledFeatureBar;
