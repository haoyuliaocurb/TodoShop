import styled from '@emotion/styled/macro';
import { styledVariables, removePx } from '../../app/cssMaterial';

const StyledFilterBar = styled.div`
  position: absolute;
  top: ${({ visibility, windowOffset, scrollOffset, isScrollEnd }) => {
    if (visibility === 2) {
      return '0';
    }
    const barHeight = removePx(styledVariables.shared.barHeight);
    // console.log('windowOffset: ', windowOffset);
    if (windowOffset <= 0 || isScrollEnd) {
      return `${barHeight}px`;
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
  padding: 0 ${styledVariables.EasySearchMode.SearchItem.SelfPaddingHor};
  background-color: ${styledVariables.color.gray100};
  display: flex;
  align-items: center;
  z-index: 4;

  &.transition {
    transition-property: top;
    transition-duration: 0.5s;
  }

  .fill {
    fill: ${styledVariables.color.pink400};
    * {
      fill: ${styledVariables.color.pink400};
    }
  }

  > * {
    height: 30px;
    // border: black solid 1px;
    // width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;

    p {
      display: inline-block;
      font-size: 14px;
      color: ${styledVariables.color.gray300};
    }
  }

  button:hover {
    * {
      fill: ${styledVariables.color.pink400};
    }
    > p {
      color: ${styledVariables.color.pink400};
    }
  }

  > .generalSort {
    > p:hover {
      color: ${styledVariables.color.pink400} !important;
    }
    &.noSort {
      > p {
        color: ${styledVariables.color.gray300};
      }
    }

    &.notNoSort {
      > p {
        color: ${styledVariables.color.pink400};
      }
    }

    // left: ${styledVariables.EasySearchMode.SearchItem.SelfPaddingHor};
    margin-right: 6px;

    > p {
      margin-right: 2px;
    }

    > span {
      position: relative;
      width: 10px;
      height: 10px;

      > svg {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  > .priceSort {
    > p:hover {
      color: ${styledVariables.color.pink400} !important;
    }
    &.noSort {
      > p {
        color: ${styledVariables.color.gray300};
      }
    }

    &.notNoSort {
      > p {
        color: ${styledVariables.color.pink400};
      }
    }

    // left: 20%;
    margin-right: 6px;

    > p {
      margin-right: 2px;
    }

    > span {
      position: relative;
      width: 10px;
      height: 10px;

      > svg {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  > .hit {
    > p:hover {
      color: ${styledVariables.color.pink400} !important;
    }
    // left: 40%;
    margin-right: 6px;

    &.selected {
      > p {
        color: ${styledVariables.color.pink400};
      }
    }

    &.unselected {
      > p {
        color: ${styledVariables.color.gray300};
      }
    }
  }

  > span {
    position: absolute;
    right: ${styledVariables.EasySearchMode.SearchItem.SelfPaddingHor};
    display: inline-block;
    display: flex;
    width: 30%;
    justify-content: flex-end;
    align-items: center;

    > .easySearch {
      left: 60%;
      border-right: ${styledVariables.color.gray300} solid 1px;
      padding-right: 18px;
      > svg {
        position: relative;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        width: 16px;
        height: 16px;
      }
    }

    > .filter {
      margin-left: 18px;
      display: flex;
      align-items: center;

      > svg {
        position: relative;
        margin-right: 4px;
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export default StyledFilterBar;
