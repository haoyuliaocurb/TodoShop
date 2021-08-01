// styling
import styled from '@emotion/styled';
import { styledVariables } from '../../app/cssMaterial';

const StyledTodolistTable = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: ${styledVariables.color.gray100};

  @media (min-width: ${styledVariables.todolistPages.breakpoint}px) {
    // position: absolute;
    width: 50%;
    // height: 100%;
    // left: 0;
  }

  > .container {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 ${styledVariables.shared.contentPadding};
    padding-bottom: ${styledVariables.shared.barHeight};
    overflow-y: scroll;
    > div {
      border-bottom: solid ${styledVariables.color.gray300} 1px;
    }
    > p.message {
      margin-top: 34px;
      margin-left: 20px;
    }
  }

  > .dividingLine {
    position: absolute;
    z-index: 5;
    width: 10px;
    height: 100%;
    right: 0px;
    box-shadow: 6px 0 8px #dddddd;
    background-color: ${styledVariables.color.gray100};
  }

  > button {
    display: inline-block;
    width: ${styledVariables.todolistTable.itemButtonWidth};
    height: 30px;
    margin: auto 0;
    padding: 0 10px;
    background-color: ${styledVariables.color.gray300};
    border-radius: 100px;
    // border: black solid 1px;
    color: ${styledVariables.color.white};
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > p {
      display: inline-block;
      margin-right: 5px;
    }

    > img {
      width: ${styledVariables.todolistTable.iconWidth};
      height: ${styledVariables.todolistTable.iconWidth};
    }
  }
`;

export default StyledTodolistTable;
