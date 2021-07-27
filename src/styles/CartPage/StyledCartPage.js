import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledCartPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  > .container {
    width: 100%;
    height: 100%;
    padding-top: ${styledVariables.shared.barHeight};
    overflow-y: scroll;
    > .scroll {
      position: relative;
      width: 100%;
      height: 200%;
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      padding-bottom: calc(${styledVariables.shared.barHeight} * 2);
      > p {
        width: 100%;
      }
      > .pageStart {
        position: absolute;
        top: 0;
      }
    }
  }
`;

export default StyledCartPage;
