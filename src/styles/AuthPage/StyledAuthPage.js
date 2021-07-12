// styling modules
import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledAuthPage = styled.form`
  width: 100%;
  height: 100%;
  background-color: ${styledVariables.color.gray100};

  > label {
    width: 100%;
    display: inline-block;
    padding: 5px 20px;

    > input {
      margin-left: 10px;
    }
  }
`;

export default StyledAuthPage;
