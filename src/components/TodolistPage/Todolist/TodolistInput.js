import { React } from 'react';
import StyledTodolistInput from '../../../styles/TodolistPage/Todolist/StyledTodolistInput';

const TodolistInput = ({
  inputDisplayContent,
  handleTodolistInputInput,
  handleTodolistInputKeyUp,
}) => {
  return (
    <StyledTodolistInput>
      <span>{inputDisplayContent}</span>
      <input
        type="text"
        id="input"
        // className={`${ifClrTransparent ? ' clr-transparent ' : ''}`}
        onInput={handleTodolistInputInput}
        onKeyUp={handleTodolistInputKeyUp}
      />
    </StyledTodolistInput>
  );
};

export default TodolistInput;
