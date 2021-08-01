import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledActivityTag = styled.button`
  padding: 6px 8px;
  margin: 0 12px;
  /* border: black solid 1px; */
  flex-shrink: 0;
  color: ${styledVariables.color.gray300};
  > p {
    display: inline-block;
  }
  &.selected {
    color: ${styledVariables.color.pink400};
    border-bottom: solid 1px ${styledVariables.color.pink400};
  }
`;

export default StyledActivityTag;
