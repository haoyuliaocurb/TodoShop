// styling modules
import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

const getStyledIcon2SearchLinkBgColor = ({ disabled }) => {
  if (disabled) {
    return styledVariables.color.gray200;
  }
  return styledVariables.color.gray300;
};

export const StyledIcon2Search = styled.span`
  display: inline-block;
  width: ${styledVariables.todolistTable.itemButtonWidth};
  height: 30px;
  // border: black solid 1px;

  > a:hover {
    background-color: ${styledVariables.color.pink400};
  }

  > a {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    border-radius: 100px;

    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: ${(props) => {
      getStyledIcon2SearchLinkBgColor(props);
    }};
    color: ${styledVariables.color.white};

    > svg {
      // display: block;
      width: ${styledVariables.todolistTable.iconWidth};
      height: ${styledVariables.todolistTable.iconWidth};
      // margin: 0 auto;

      path {
        fill: ${styledVariables.color.white};
      }
    }

    > p.textIcon {
      position: absolute;
      left: 0;
      display: inline-block;
      margin-left: 15px;
    }
  }
`;

export const StyledTodolistTableItem = styled.div`
  position: relative;
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 10px;
  border-bottom: solid ${styledVariables.color.gray300} 1px;
  background-color: ${({ clickState }) => {
    switch (clickState) {
      case 0:
        // disabled
        return 'transparent';
      case 1:
        // selected
        return 'red';
      case 2:
        // unselected
        return 'transparent';
      default:
        return 'transparent';
    }
  }};

  > div {
    display: inline-block;
    // border: black solid 1px;
    width: calc(100% - ${styledVariables.todolistTable.itemButtonWidth});
    height: 100%;
    position: relative;

    > p {
      position: absolute;
      bottom: 0;
      color: ${styledVariables.color.gray300};
      width: 100%;
      padding-right: 7%;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      > .cartedItem {
        color: red;
      }

      > span:not(:last-of-type)::after {
        content: '、';
      }
    }
  }
`;
