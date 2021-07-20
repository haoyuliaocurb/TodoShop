import styled from '@emotion/styled/macro';
import { styledVariables, removePx } from './cssMaterial';

const StyledNavBar = styled.div`
  position: fixed;
  top: ${({ windowOffset, scrollOffset, isScrollEnd }) => {
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
  background-color: ${styledVariables.color.gray100};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  padding: 0 ${styledVariables.shared.contentPadding};

  &.transition {
    transition-property: top;
    transition-duration: 0.5s;
  }

  > a {
    > img {
      position: absolute;
      left: ${styledVariables.shared.contentPadding};
      top: 0;
      bottom: 0;
      margin: auto 0;
      width: ${styledVariables.navBar.iconWidth};
      height: ${styledVariables.navBar.iconWidth};
    }
  }

  > h1 {
    text-align: center;
  }

  > button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: ${styledVariables.shared.contentPadding};
    margin: auto 0;
    display: inline-block;
    width: ${styledVariables.navBar.buttonWidth};
    height: ${styledVariables.navBar.iconWidth};
    // border: solid 1px black;
  }
`;

export default StyledNavBar;
