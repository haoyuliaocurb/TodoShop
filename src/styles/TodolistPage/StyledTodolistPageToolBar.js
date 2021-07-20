import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledTodolistPageToolBar = styled.div`
  // width, height 於 styledToolBar 中設定
  // <TodolistPageToolBar /> 與 <ToolBar /> compose

  // border: solid 1px black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
  padding: 0 ${styledVariables.shared.contentPadding};

  > .buttonAddTodolist {
    height: 30px;
    padding: 0 10px;
    margin-right: 10px;
    background-color: ${styledVariables.color.pink100};
    border-radius: 100px;
  }
`;

export default StyledTodolistPageToolBar;
