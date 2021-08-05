import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledCartPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .textNoCartItems {
    background-color: transparent;
    padding: 20px;
  }

  > .container {
    width: 100%;
    height: 100%;
    padding-top: ${styledVariables.shared.barHeight};
    overflow-y: scroll;
    background-color: ${styledVariables.color.gray100};
    > .scroll {
      position: relative;
      width: 100%;
      > .cartedBlock {
        > div:last-of-type {
          margin-bottom: calc(${styledVariables.shared.barHeight} * 2);
        }

        > :not(div:first-of-type) {
          margin-top: 10px;
        }
      }
    }
  }
`;

export default StyledCartPage;
