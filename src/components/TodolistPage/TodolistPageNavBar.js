import { React } from 'react';
import { Link } from 'react-router-dom';
import IconAppContent from '../../styles/app/IconAppContent';
import StyledTodolistPageNavBar from '../../styles/TodolistPage/StyledTodolistPageNavBar';

const TodolistPageNavBar = () => {
  return (
    <StyledTodolistPageNavBar>
      <Link to="/todolist/table">
        <IconAppContent.ChevronLeft />
      </Link>
      <h1>您的購物清單</h1>
      <button type="submit">管理</button>
    </StyledTodolistPageNavBar>
  );
};

export default TodolistPageNavBar;
