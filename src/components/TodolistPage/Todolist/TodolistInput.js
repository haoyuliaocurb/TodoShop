import { React } from 'react';
import StyledTodolistInput from '../../../styles/TodolistPage/Todolist/StyledTodolistInput';

const TodolistInput = ({ inputDisplayContent, onInputElInput, onInputKeyUp }) => {
  return (
    <StyledTodolistInput>
      <span>{inputDisplayContent}</span>
      <input
        type="text"
        id="input"
        // className={`${ifClrTransparent ? ' clr-transparent ' : ''}`}
        onInput={onInputElInput}
        onKeyUp={onInputKeyUp}
      />
    </StyledTodolistInput>
  );
};

export default TodolistInput;
