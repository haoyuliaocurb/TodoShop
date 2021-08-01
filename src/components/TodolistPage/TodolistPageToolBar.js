import { React, useRef } from 'react';
import StyledTodolistPageToolBar from '../../styles/TodolistPage/StyledTodolistPageToolBar';
import ModalMessage from '../app/ModalMessage';

const TodolistPageToolBar = ({
  buttonState,
  handleToolBarCreateTodolistButton,
  handleToolBarDeleteTodolistButton,
}) => {
  const ModolMessagePleaseSignInRef = useRef(null);
  const toolBarButtonState = !buttonState ? null : buttonState.toolBar;
  // console.log('toolBarButtonState: ', toolBarButtonState);
  // console.log('<TodolistPageToolBar />: render');
  const addTodolistButtonState = !toolBarButtonState ? null : toolBarButtonState.addTodolistButton;
  const deleteTodolistButtonState = !toolBarButtonState
    ? null
    : toolBarButtonState.deleteTodolistButton;
  const handleCreateTodolistButtonClick = () => {
    ModolMessagePleaseSignInRef.current.classList.remove('op-zero');
    ModolMessagePleaseSignInRef.current.addEventListener(
      'transitionend',
      () => {
        ModolMessagePleaseSignInRef.current.classList.add('op-zero');
      },
      { once: true },
    );
    handleToolBarCreateTodolistButton();
  };
  return (
    <StyledTodolistPageToolBar>
      <button
        onClick={handleCreateTodolistButtonClick}
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
      <ModalMessage
        message={
          <span>
            請登入帳戶
            <br />
            以新增購物清單
          </span>
        }
        ModolMessageRef={ModolMessagePleaseSignInRef}
      />
    </StyledTodolistPageToolBar>
  );
};

export default TodolistPageToolBar;
