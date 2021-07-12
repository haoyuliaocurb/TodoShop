// styling
import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledSearchPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${styledVariables.color.white};

  > nav {
    position: absolute;
    top: calc(-${styledVariables.shared.barHeight} - 5px);
    width: 100%;
    height: ${styledVariables.shared.barHeight};
    background-color: ${styledVariables.color.gray100};
  }
`;

export default StyledSearchPage;
