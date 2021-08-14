import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledUser = styled.div`
  width: 100%;
  height: 100%;
  padding-top: ${styledVariables.shared.barHeight};
  .userContentContainer {
    position: relative;
    width: 100%;
    height: 100%;
    /* border: black solid 1px; */
    overflow-x: hidden;
    > div:not(.userInfoBar, .sideMenu) {
      position: relative;
      width: 100%;
      height: calc(100% - ${styledVariables.shared.barHeight});
      padding-top: calc(20px + ${styledVariables.shared.barHeight});
      display: flex;
      background-color: ${styledVariables.color.gray100};
    }
  }
  .userInfoBar {
    position: absolute;
    width: 100%;
    height: 70px;
    top: 0;
    background-color: ${styledVariables.color.gray100};
    padding: 10px 0;
    z-index: 2;
    > img {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      left: 16px;
      width: 40px;
      height: 40px;
      border-radius: 100px;
      background-color: ${styledVariables.color.gray300};
    }
    > .img {
      position: absolute;
      top: 0;
      bottom: 10px;
      margin: auto 0;
      left: ${styledVariables.AuthPage.userInfoBarPaddingHor};
      width: 40px;
      height: 40px;
      border-radius: 100px;
      background-color: ${styledVariables.color.gray270};
      display: flex;
      justify-content: center;
      align-items: center;
      > svg {
        width: 26px;
        height: 26px;
        fill: ${styledVariables.color.pink100};

        * {
          fill: ${styledVariables.color.pink100};
        }
      }
    }
    > .textUserInfo {
      width: 100%;
      height: 100%;
      /* border: black solid 1px; */
      padding-left: 80px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      @media (max-width: 400px) {
        width: calc(100% - ${styledVariables.AuthPage.buttonMenuWidth} - 40px);
      }
      > * {
        width: 100%;
      }
      > h3 {
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      > .textMemberType {
        margin-top: 8px;
        > span {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 100px;
          background-color: ${styledVariables.color.pink400};
          color: ${styledVariables.color.white};
        }
      }
    }
    > .buttonMenu {
      display: none;
      position: absolute;
      width: 20px;
      height: 20px;
      top: 10px;
      right: calc(${styledVariables.AuthPage.userInfoBarPaddingHor} + 6px);
      @media (max-width: 600px) {
        display: block;
      }
    }
  }
  .sideMenu {
    position: absolute;
    z-index: 5;
    right: 0;
    top: 0;
    /* border: black 1px solid; */
    width: 160px;
    height: calc(100vh - ${styledVariables.shared.barHeight} * 2);
    /* background-color: ${styledVariables.color.transGray80}; */
    background-color: ${styledVariables.color.pink100};
    box-shadow: -1px 3px 5px 2px ${styledVariables.color.gray200};
    padding-top: 80px;
    padding-left: 10px;
    padding-right: 10px;
    transition: all 0.3s;
    overflow: hidden;
    &.close {
      width: 0;
      opacity: 0;
      cursor: pointer;
      * {
        opacity: 0;
      }
    }
    > .buttonClose {
      position: absolute;
      top: 10px;
      right: calc(${styledVariables.AuthPage.userInfoBarPaddingHor} + 6px);
      width: 20px;
      height: 20px;
    }
    > .item {
      &.item:last-of-type {
        border-bottom: none;
      }
      width: 100%;
      height: 40px;
      /* border: red solid 1px; */
      padding: 0 10px;
      border-bottom: 1px solid ${styledVariables.color.gray250};
      > span {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        /* border: 1px solid black; */
        display: flex;
        align-items: center;
        justify-content: center;

        .container {
          position: relative;
          display: inline-block;
          width: 100%;
          height: 20px;
          overflow: hidden;
          > span {
            position: absolute;
            left: 0;
            display: inline-block;
            width: 200px;
            text-align: left;
          }
        }
        > svg {
          width: 22px;
          height: 22px;
          margin-right: 10px;
          fill: ${styledVariables.color.gray300};
          * {
            fill: ${styledVariables.color.gray300};
          }
        }
      }
    }
  }
  .userContentDashboard {
    width: ${styledVariables.AuthPage.userContentDashboardWidth};
    height: 100%;
    /* border: blue solid 1px; */
    background-color: ${styledVariables.color.white};
    padding: 10px;
    padding-bottom: 20px;
    > .item {
      &.item:last-of-type {
        border-bottom: none;
      }
      width: 100%;
      height: 40px;
      /* border: red solid 1px; */
      padding: 0 10px;
      border-bottom: 1px solid ${styledVariables.color.gray200};
      > span {
        display: inline-block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        > svg {
          width: 22px;
          height: 22px;
          margin-right: 10px;
          fill: ${styledVariables.color.gray300};
          * {
            fill: ${styledVariables.color.gray300};
          }
        }
      }
    }
    @media (max-width: 600px) {
      display: none;
    }
  }
  .UserContent {
    width: calc(100% - ${styledVariables.AuthPage.userContentDashboardWidth});
    height: 100%;
    /* border: red solid 1px; */
    background-color: ${styledVariables.color.white};
    padding: 20px 10px;
    padding-left: 20px;
    padding-right: 20px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

export default StyledUser;
