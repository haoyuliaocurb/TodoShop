import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledHomePage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${styledVariables.shared.barHeight} 0;
  display: flex;

  > .content {
    width: 100%;
    height: 200%;
    background-color: ${styledVariables.color.pink100};
    > .carousel {
      width: 100%;
      height: 300px;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export default StyledHomePage;
