import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledSearchNavBarItems = styled.div`
  margin: 0 20px;
  padding: 10px 0;
  display: inline-block;
  width: 80%;
  max-width: ${styledVariables.shared.contentMaxWidth};
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;

  > button {
    display: inline-block;
    padding: 6px 12px;
    border: solid 1px ${styledVariables.color.gray200};
    border-radius: 100px;
    flex-shrink: 0;
    color: ${styledVariables.color.gray300};
    display: flex;
    align-items: center;

    > svg {
      margin-left: 4px;
      width: 12px;
      height: 12px;
    }
  }

  > .selected {
    background-color: ${styledVariables.color.white};
    border: none;
  }

  > :not(button:first-of-type) {
    margin-left: 12px;
  }
`;

export default StyledSearchNavBarItems;
