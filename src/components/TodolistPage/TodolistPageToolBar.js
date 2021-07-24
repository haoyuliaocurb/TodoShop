import { React } from 'react';
import StyledTodolistPageToolBar from '../../styles/TodolistPage/StyledTodolistPageToolBar';

const TodolistPageToolBar = ({
  buttonState,
  handleToolBarCreateTodolistButton,
  handleToolBarDeleteTodolistButton,
}) => {
  const toolBarButtonState = !buttonState ? null : buttonState.toolBar;
  // console.log('toolBarButtonState: ', toolBarButtonState);
  console.log('<TodolistPageToolBar />: render');
  const addTodolistButtonState = !toolBarButtonState ? null : toolBarButtonState.addTodolistButton;
  const deleteTodolistButtonState = !toolBarButtonState
    ? null
    : toolBarButtonState.deleteTodolistButton;
  return (
    <StyledTodolistPageToolBar>
      <button
        onClick={() => {
          // console.log('<TodolistPageToolBar />: trigger button onClick');
          // console.log('currentUid: ', currentUid);
          handleToolBarCreateTodolistButton();
        }}
        type="button"
        className={!addTodolistButtonState ? 'addTodolistButton dp-none' : 'addTodolistButton'}
      >
        新增購物清單 +
      </button>
      <button
        onClick={() => {
          handleToolBarDeleteTodolistButton(buttonState);
        }}
        type="button"
        className={
          !deleteTodolistButtonState ? 'deleteTodolistButton dp-none' : 'deleteTodolistButton'
        }
      >
        刪除購物清單
      </button>
    </StyledTodolistPageToolBar>
  );
};

export default TodolistPageToolBar;
