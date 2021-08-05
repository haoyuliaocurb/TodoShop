// styling modules
import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledAuthPage = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: ${styledVariables.color.gray100}; */

  > form {
    width: 100%;
    height: 100%;
    padding: 20px;

    > * {
      margin-top: 10px;
    }

    > label {
      width: 100%;
      display: inline-block;
    }

    > input {
      margin-left: 10px;
    }

    > button {
      display: inline-block;
      margin-right: 10px;
      background-color: ${styledVariables.color.gray300};
      color: ${styledVariables.color.white};
      padding: 10px;
      border-radius: 100px;
    }
  }
`;

export default StyledAuthPage;
