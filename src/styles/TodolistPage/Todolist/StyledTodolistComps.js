// styling modules
import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

export const StyledTodolistItem = styled.span`
  display: inline-block;
  position: relative;
  background-color: ${styledVariables.color.pink400};
  height: ${styledVariables.todolist.itemHeight};
  margin: ${styledVariables.todolist.itemMargin} calc(${styledVariables.todolist.itemMargin} / 2);

  padding: 6px 16px;
  border-radius: 100px;
  z-index: 2;

  display: flex;
  align-items: center;

  font-size: 14px;
  color: ${styledVariables.color.white};

  > svg {
    width: 13px;
    height: 13px;
    margin-left: 8px;

    path {
      fill: ${styledVariables.color.white};
    }
  }
`;

export const StyledTodolistInput = styled.span`
  display: inline-block;
  position: relative;
  // border: black solid 1px;
  z-index: 0;
  height: ${styledVariables.todolist.itemHeight};
  margin: ${styledVariables.todolist.itemMargin} 0;
  padding: 0 10px;

  > span {
    height: 100%;
    max-width: 560px;
    // border: red solid 1px;

    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
  }

  > input {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 5px;
    background-color: transparent;
    border: none;
  }

  > input:focus {
    outline: none;
  }
`;

export const StyledTodolist = styled.div`
  width: 100%;
  height: 100%;

  @media (min-width: ${styledVariables.todolistPages.breakpoint}px) {
    position: absolute;
    width: 50%;
    right: 0;
  }

  > form {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${styledVariables.color.gray100};
    padding-top: ${styledVariables.todolistTable.selfPaddingTop};
    padding-bottom: ${styledVariables.todolistTable.selfPaddingTop};
    padding-left: ${styledVariables.shared.contentPadding};
    padding-right: ${styledVariables.shared.contentPadding};

    display: flex;
    flex-wrap: wrap;
    align-content: start;

    > label {
      position: absolute;
      top: ${styledVariables.todolistTable.selfPaddingTop};
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    > .grid {
      position: absolute;
      top: ${styledVariables.todolistTable.selfPaddingTop};
      z-index: 0;
      width: calc(100% - ${styledVariables.shared.contentPadding} * 2);
      height: 100%;

      > div {
        width: 100%;
        height: calc(
          ${styledVariables.todolist.itemHeight} + 2 * ${styledVariables.todolist.itemMargin}
        );
        border-bottom: solid 1px ${styledVariables.color.gray300};
      }
    }
  }
`;
