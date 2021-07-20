import styled from '@emotion/styled/macro';
import { styledVariables } from './cssMaterial';

const StyledToolBar = styled.div`
  position: fixed;
  bottom: ${styledVariables.shared.barHeight};
  width: 100%;
  height: ${styledVariables.shared.barHeight};
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 100%;
    height: 100%;
  }
`;

export default StyledToolBar;
