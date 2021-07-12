// styling modules
import styled from '@emotion/styled/macro';
import { styledVariables } from './cssMaterial';

const StyledMain = styled.main`
  position: relative;
  padding: ${styledVariables.shared.barHeight} 0;
  width: 100%;
  min-height: 100%;
  z-index: 0;
`;

export default StyledMain;
