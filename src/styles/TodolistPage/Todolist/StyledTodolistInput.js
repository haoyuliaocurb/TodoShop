import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

const StyledTodolistInput = styled.span`
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

export default StyledTodolistInput;
