import { React } from 'react';
import { Link } from 'react-router-dom';
import IconAppContent from '../../styles/app/IconAppContent';
import StyledTodolistPageNavBar from '../../styles/TodolistPage/StyledTodolistPageNavBar';

const TodolistPageNavBar = ({
  handleNavBarManageButton,
  handleNavBarChevronLeft,
  isManageMode,
  currentUid,
}) => {
  // console.log('currentUid:', currentUid);
  // console.log('isManageMode: ', isManageMode);
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
      {!currentUid ? (
        <span />
      ) : (
        <button
          onClick={() => {
            handleNavBarManageButton(isManageMode);
          }}
          type="button"
        >
          {!isManageMode ? '管理' : '完成'}
        </button>
      )}
    </StyledTodolistPageNavBar>
  );
};

export default TodolistPageNavBar;
