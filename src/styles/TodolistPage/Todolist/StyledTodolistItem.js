import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

const StyledTodolistItem = styled.span`
  display: inline-block;
  position: relative;
  background-color: ${styledVariables.color.pink400};
  height: ${styledVariables.todolist.itemHeight};
  margin: ${styledVariables.todolist.itemMargin} calc(${styledVariables.todolist.itemMargin} / 2);

  padding: 6px 16px;
  border-radius: 100px;
  z-index: 2;

  display: flex;
  align-items: center;

  font-size: 14px;
  color: ${styledVariables.color.white};

  > svg {
    width: 13px;
    height: 13px;
    margin-left: 8px;

    path {
      fill: ${styledVariables.color.white};
    }
  }
`;

export default StyledTodolistItem;
