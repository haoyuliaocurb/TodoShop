import { React } from 'react';
import StyledTodolistPageToolBar from '../../styles/TodolistPage/StyledTodolistPageToolBar';

const TodolistPageToolBar = () => {
  return (
    <StyledTodolistPageToolBar>
      <button type="button" className="buttonAddTodolist">
        新增購物清單 +
      </button>
    </StyledTodolistPageToolBar>
  );
};

export default TodolistPageToolBar;
