import { React, useRef } from 'react';
import { Link } from 'react-router-dom';
import IconAppContent from '../../styles/app/IconAppContent';
import StyledTodolistPageNavBar from '../../styles/TodolistPage/StyledTodolistPageNavBar';

const TodolistPageNavBar = ({ handleNavBarManageButton, handleNavBarChevronLeft }) => {
  const istriggeredManageButton = useRef(0);

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
      <button
        onClick={() => {
          handleNavBarManageButton(istriggeredManageButton.current);
          if (istriggeredManageButton.current === 0) {
            istriggeredManageButton.current = 1;
          } else {
            istriggeredManageButton.current = 0;
          }
        }}
        type="button"
      >
        管理
      </button>
    </StyledTodolistPageNavBar>
  );
};

export default TodolistPageNavBar;
