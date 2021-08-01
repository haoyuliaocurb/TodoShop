import { React } from 'react';
import { Link } from 'react-router-dom';
import IconAppContent from '../../styles/app/IconAppContent';
import StyledTodolistPageNavBar from '../../styles/TodolistPage/StyledTodolistPageNavBar';

const TodolistPageNavBar = ({
  handleNavBarManageButton,
  handleNavBarChevronLeft,
  isManageMode,
  isSignIn,
}) => {
  return (
    <StyledTodolistPageNavBar>
      <Link
        to="/todolist/table"
        onClick={(e) => {
          e.preventDefault();
          handleNavBarChevronLeft();
        }}
      >
        <IconAppContent.ChevronLeft />
      </Link>
      <h1>您的購物清單</h1>
      {!isSignIn ? (
        <span />
      ) : (
        <button
          onClick={() => {
            handleNavBarManageButton(isManageMode);
          }}
          type="button"
        >
          管理
        </button>
      )}
    </StyledTodolistPageNavBar>
  );
};

export default TodolistPageNavBar;
