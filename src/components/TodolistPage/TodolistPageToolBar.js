/* eslint-disable no-unused-vars */
import { React, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import StyledTodolistPageToolBar from '../../styles/TodolistPage/StyledTodolistPageToolBar';
import ModalMessage from '../app/ModalMessage';

const TodolistPageToolBar = ({
  buttonState,
  handleToolBarCreateTodolistButton,
  handleToolBarDeleteTodolistButton,
  currentUid,
}) => {
  const history = useHistory();
  const location = useLocation();
  const ModolMessagePleaseSignInRef = useRef(null);
  const ModolMessageAtLeastOneItemRef = useRef(null);
  const toolBarButtonState = !buttonState ? null : buttonState.toolBar;
  // console.log('toolBarButtonState: ', toolBarButtonState);
  // console.log('<TodolistPageToolBar />: render');
  const addTodolistButtonState = !toolBarButtonState ? null : toolBarButtonState.addTodolistButton;
  const deleteTodolistButtonState = !toolBarButtonState
    ? null
    : toolBarButtonState.deleteTodolistButton;
  // console.log('addTodolistButtonState: ', addTodolistButtonState);
  // console.log('deleteTodolistButtonState: ', deleteTodolistButtonState);
  const handleCreateTodolistButtonClick = () => {
    if (!currentUid) {
      const newTodolistData = JSON.parse(window.localStorage.getItem('TodoShopTodolist'));
      if (!newTodolistData) {
        ModolMessageAtLeastOneItemRef.current.classList.remove('op-zero');
        ModolMessageAtLeastOneItemRef.current.addEventListener(
          'transitionend',
          () => {
            ModolMessageAtLeastOneItemRef.current.classList.add('op-zero');
          },
          { once: true },
        );
        return;
      }
      ModolMessagePleaseSignInRef.current.classList.remove('op-zero');
      ModolMessagePleaseSignInRef.current.addEventListener(
        'transitionend',
        () => {
          ModolMessagePleaseSignInRef.current.classList.add('op-zero');
          ModolMessagePleaseSignInRef.current.addEventListener(
            'transitionend',
            () => {
              window.localStorage.setItem('TodoShopIsAskedForward2SignIn', '1');
              history.push('/auth/signIn');
            },
            { once: true },
          );
        },
        { once: true },
      );
    }
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
      <ModalMessage
        message={<span>請新增至少一個待購項目</span>}
        ModolMessageRef={ModolMessageAtLeastOneItemRef}
      />
    </StyledTodolistPageToolBar>
  );
};

export default TodolistPageToolBar;
