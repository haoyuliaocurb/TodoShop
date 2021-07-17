// styling
import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledSearchPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${styledVariables.color.white};
  display: flex;
  justify-content: center;

  > nav {
    position: absolute;
    top: calc(-${styledVariables.shared.barHeight});
    width: 100%;
    height: ${styledVariables.shared.barHeight};
    background-color: ${styledVariables.color.gray100};
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      position: relative;
      width: 75%;
      height: 100%;
      // border: black solid 1px;
      display: flex;
      justify-content: center;

      > span {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        width: 16px;
        height: 16px;
        border: ${styledVariables.color.gray300} solid 1px;
        border-radius: 4px;
        font-size: 8px;
        line-height: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${styledVariables.color.gray300};
      }

      > div.container {
        display: inline-block;
        width: 80%;
        margin: auto;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;

        > span {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 100px;
          flex-shrink: 0;
          color: ${styledVariables.color.gray300};
        }

        > .selected {
          background-color: ${styledVariables.color.white};
        }

        > :not(span:first-of-type) {
          margin-left: 4px;
        }
      }

      > svg.iconAdd {
        position: absolute;
        top: 0;
        bottom: 4px;
        margin: auto 0;
        right: 0;
        width: 20px;
        height: 20px;
      }
    }

    > svg.iconChenvronLeft {
      position: absolute;
      top: 0;
      bottom: 0;
      left: ${styledVariables.EasySearchMode.SearchItem.SelfPaddingHor};
      margin: auto 0;
      width: 24px;
      height: 24px;
      fill: ${styledVariables.color.gray700};

      * {
        fill: ${styledVariables.color.gray700};
      }
    }

    > .iconCart {
      display: inline-block;
      position: absolute;
      top: 0;
      bottom: 8px;
      margin: auto 0;
      right: ${styledVariables.EasySearchMode.SearchItem.SelfPaddingHor};
      width: 40px;
      height: 27px;
      // border: black solid 1px;

      > svg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 80%;
        height: 80%;
        fill: ${styledVariables.color.gray700};

        * {
          fill: ${styledVariables.color.gray700};
        }
      }

      > span {
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        width: 12px;
        height: 12px;
        font-size: 6px;
        line-height: 6px;
        color: ${styledVariables.color.white};
        background-color: ${styledVariables.color.pink400};
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

export default StyledSearchPage;
