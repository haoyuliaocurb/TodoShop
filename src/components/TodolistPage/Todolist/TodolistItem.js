import { React } from 'react';
import IconTodolistPages from '../../../styles/TodolistPage/IconTodolistPage';
import StyledTodolistItem from '../../../styles/TodolistPage/Todolist/StyledTodolistItem';

const TodolistItem = ({ id, onItemClick, content }) => {
  // console.log('ref: ', ref);
  return (
    <StyledTodolistItem id={id} onClick={onItemClick}>
      {content}
      <IconTodolistPages.Close />
    </StyledTodolistItem>
  );
};

export default TodolistItem;
