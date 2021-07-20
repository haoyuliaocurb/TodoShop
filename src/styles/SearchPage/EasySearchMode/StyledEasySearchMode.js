// styling
import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

const StyledEasySearchMode = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  > .container {
    position: relative;
    width: 100%;
    max-width: ${styledVariables.shared.contentMaxWidth};
    // min-height: 100%;
    overflow-y: scroll;
    padding: ${styledVariables.shared.barHeight} 0;

    > div:last-of-type {
      margin-bottom: 10px;
    }

    > button {
      display: inline-block;
      position: fixed;
      right: 0;
      width: 36px;
      height: 36px;
      z-index: 5;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100px 0 0 100px;
      > svg {
        width: 36%;
        height: 36%;
        fill: ${styledVariables.color.white};
        * {
          fill: ${styledVariables.color.white};
        }
      }
    }

    /* > :last-child::after {
      content: '';
      display: inline-block;
      // width: 100%;
      height: ${styledVariables.shared.barHeight};
    } */
  }
`;

export default StyledEasySearchMode;
