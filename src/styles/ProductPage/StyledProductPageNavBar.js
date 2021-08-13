import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledProductPageNavBar = styled.nav`
  position: relative;
  width: 100%;
  height: 100%;
  /* border: black solid 1px; */
  * {
    transition: background-color 0.2s;
  }
  > div {
    width: 100%;
    height: 100%;
    background-color: ${styledVariables.color.gray100};
    &.simple {
      background-color: transparent;
      .iconCart {
        > svg {
          fill: ${styledVariables.color.white};

          * {
            fill: ${styledVariables.color.white};
          }
        }
      }
      .groupIconChenvronLeft {
        > .iconChenvronLeft {
          fill: ${styledVariables.color.white};
          * {
            fill: ${styledVariables.color.white};
          }
        }
      }
    }
    .iconCart {
      display: inline-block;
      position: absolute;
      top: 0;
      bottom: 4px;
      margin: auto 0;
      right: ${styledVariables.shared.contentPadding};
      width: 40px;
      height: 27px;

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

      > .background {
        display: inline-block;
        position: absolute;
        top: -1px;
        left: 1px;
        width: 33px;
        height: 33px;
        background-color: ${styledVariables.color.gray300};
      }

      > span {
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        width: 12px;
        height: 12px;
        font-size: 9px;
        color: ${styledVariables.color.white};
        background-color: ${styledVariables.color.pink400};
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .groupIconChenvronLeft {
      position: absolute;
      top: 0;
      bottom: 0;
      left: ${styledVariables.productPage.contentPaddingHor};
      margin: auto 0;
      width: 24px;
      height: 24px;
      > .background {
        display: inline-block;
        position: absolute;
        top: -4px;
        left: -4px;
        width: 33px;
        height: 33px;
        background-color: ${styledVariables.color.gray300};
        border-radius: 100px;
      }
      > .iconChenvronLeft {
        position: relative;
        fill: ${styledVariables.color.gray700};
        * {
          fill: ${styledVariables.color.gray700};
        }
      }
    }
  }
`;

export default StyledProductPageNavBar;
