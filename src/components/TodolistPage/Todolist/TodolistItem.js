import { React } from 'react';
import IconTodolistPages from '../../../styles/TodolistPage/IconTodolistPage';
import StyledTodolistItem from '../../../styles/TodolistPage/Todolist/StyledTodolistItem';

const TodolistItem = ({ handleTodolistItemClick, content }) => {
  // console.log('ref: ', ref);
  return (
    <StyledTodolistItem onClick={handleTodolistItemClick}>
      {content}
      <IconTodolistPages.Close />
    </StyledTodolistItem>
  );
};

export default TodolistItem;
