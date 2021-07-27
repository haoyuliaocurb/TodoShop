import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledUser = styled.div`
  width: 100%;
  height: 100%;
  > .userContent {
    width: 100%;
    height: 100%;
    > .welcoming {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      text-align: center;
    }
    > button {
      display: block;
      width: 80px;
      height: 30px;
      margin: 0 auto;
      background-color: ${styledVariables.color.pink400};
      /* border: black solid 1px; */
      border-radius: 100px;
    }
  }
`;

export default StyledUser;
