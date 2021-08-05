import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledColumnMessage = styled.div`
  width: 100%;
  height: 80px;
  /* border: black solid 1px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .text {
    width: 100%;
    color: ${styledVariables.color.gray270};
    letter-spacing: 1px;
    text-align: center;
  }

  .img {
    width: 20px;
    height: 20px;
    margin: 0 auto;
    margin-bottom: 12px;

    > * {
      width: 100%;
      height: 100%;
      fill: ${styledVariables.color.gray270};

      * {
        fill: ${styledVariables.color.gray270};
      }
    }
  }
`;

export default StyledColumnMessage;
