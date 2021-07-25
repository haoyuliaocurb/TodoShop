import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledSearchNavBar = styled.nav`
  width: 100%;
  height: 100%;
  background-color: ${styledVariables.color.gray100};
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    position: relative;
    width: 85%;
    height: 100%;
    // border: black solid 1px;
    display: flex;
    justify-content: center;
    align-items: center;

    > span.formerItemAmount {
      margin-left: 10px;
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

    > span.latterItemAmount {
      margin-right: 10px;
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

    > svg.iconAdd {
      margin-right: 20px;
      padding-bottom: 4px;
      width: 20px;
      height: 20px;
    }
  }

  > svg.iconChenvronLeft {
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${styledVariables.shared.contentPadding};
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
    right: ${styledVariables.shared.contentPadding};
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
`;

export default StyledSearchNavBar;