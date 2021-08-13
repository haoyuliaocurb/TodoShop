// styling modules
import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

const getStyledIcon2SearchLinkBgColor = ({ disabled }) => {
  if (disabled) {
    // console.log('disabled in getStyledIcon2SearchLinkBgColor');
    return styledVariables.color.gray200;
  }
  return styledVariables.color.gray300;
};

export const StyledIcon2Search = styled.span`
  display: inline-block;
  width: ${styledVariables.todolistTable.itemButtonWidth};
  height: 30px;
  // border: black solid 1px;

  > button:hover {
    background-color: ${styledVariables.color.pink400};
  }

  > button {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    border-radius: 100px;

    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: ${(props) => {
      return getStyledIcon2SearchLinkBgColor(props);
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
  background-color: ${({ tableItemButtonState }) => {
    // console.log('<StyledTodolistTableItem />: tableItemButtonState: ', tableItemButtonState);
    switch (tableItemButtonState) {
      case 0:
        // disabled
        return 'transparent';
      case 1:
        // active
        return 'transparent';
      case 2:
        // currentList unfocus
        return styledVariables.color.gray200;
      case 3:
        // currentList focus
        return styledVariables.color.pink100;
      case 4:
        // management unfocus
        return 'transparent';
      case 5:
        // management focus
        return styledVariables.color.pink100;
      default:
        return 'transparent';
    }
  }};

  /* &.currentList {
  background-color: ${(props) => {
    // console.log('props.isCurrentList: ', props.isCurrentList);
    switch (props.isCurrentList) {
      case 1:
        return styledVariables.color.pink100;
      case 2:
        return styledVariables.color.gray200;
      default:
        return styledVariables.color.gray200;
    }
  }};
  } */

  > div.content {
    display: inline-block;
    // border: black solid 1px;
    width: ${({ tableItemButtonState }) => {
      switch (tableItemButtonState) {
        case 4:
          return `calc(100% - ${styledVariables.todolistTable.buttonWidthSum})`;
        case 5:
          return `calc(100% - ${styledVariables.todolistTable.buttonWidthSum})`;
        default:
          return `calc(100% - ${styledVariables.todolistTable.itemButtonWidth})`;
      }
    }};
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

  > div.selectTableItemButton {
    height: 100%;
    width: ${styledVariables.todolistTable.selectTableItemButtonWidth};
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 15px;

    > div {
      position: absolute;
    }

    > div.outline {
      width: 20px;
      height: 20px;
      border: solid ${styledVariables.color.gray300} 1px;
      border-radius: 100px;
    }

    > div.fill {
      width: 10px;
      height: 10px;
      background-color: ${({ tableItemButtonState }) => {
        switch (tableItemButtonState) {
          case 5:
            return styledVariables.color.gray300;
          default:
            return 'transparent';
        }
      }};
      border-radius: 100px;
    }
  }
`;
