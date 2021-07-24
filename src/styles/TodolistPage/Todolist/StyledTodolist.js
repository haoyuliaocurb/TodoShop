import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

const StyledTodolist = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  @media (min-width: ${styledVariables.todolistPages.breakpoint}px) {
    // position: absolute;
    width: 50%;
    // right: 0;
  }

  > form {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${styledVariables.color.gray100};
    padding-left: ${styledVariables.shared.contentPadding};
    padding-right: ${styledVariables.shared.contentPadding};

    display: flex;
    flex-wrap: wrap;
    align-content: start;

    > label {
      position: absolute;
      top: ${styledVariables.todolistTable.selfPaddingTop};
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    > .grid {
      position: absolute;
      z-index: 0;
      width: calc(100% - ${styledVariables.shared.contentPadding} * 2);
      height: 100%;

      > div {
        width: 100%;
        height: 65px;
        border-bottom: solid 1px ${styledVariables.color.gray300};
      }
    }
  }
`;

export default StyledTodolist;
