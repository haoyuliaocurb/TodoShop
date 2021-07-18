// styling
import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

const StyledEasySearchMode = styled.div`
  width: 100%;
  max-width: ${styledVariables.shared.contentMaxWidth};
  min-height: 100%;
  overflow-y: scroll;

  > div:last-of-type {
    margin-bottom: 10px;
  }
`;

export default StyledEasySearchMode;
