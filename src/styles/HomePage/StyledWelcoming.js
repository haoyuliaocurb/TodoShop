import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledWelcoming = styled.div`
  width: 100%;
  height: ${styledVariables.HomePage.welcomingHeight};
  > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export default StyledWelcoming;
