import { React } from 'react';
import StyledTodolistPageToolBar from '../../styles/TodolistPage/StyledTodolistPageToolBar';

const TodolistPageToolBar = ({ createTodolist, currentUid }) => {
  return (
    <StyledTodolistPageToolBar>
      <button
        onClick={() => {
          createTodolist(currentUid);
        }}
        type="button"
        className="buttonAddTodolist"
      >
        新增購物清單 +
      </button>
    </StyledTodolistPageToolBar>
  );
};

export default TodolistPageToolBar;
