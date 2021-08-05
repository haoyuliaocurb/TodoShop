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
    > div:not(.userInfoBar) {
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
    height: ${styledVariables.shared.barHeight};
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
    > .textUserInfo {
      width: 100%;
      height: 100%;
      /* border: black solid 1px; */
      padding-left: 80px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      > * {
        width: 100%;
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
  }
  .UserContent {
    width: calc(100% - ${styledVariables.AuthPage.userContentDashboardWidth});
    height: 100%;
    /* border: red solid 1px; */
    background-color: ${styledVariables.color.white};
    padding: 20px 10px;
    padding-left: 40px;
    padding-right: 20px;
  }
`;

export default StyledUser;
