import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

const StyledFeatureTag = styled.span`
  flex-shrink: 0;

  display: inline-block;
  // border: black 1px solid;
  padding: 6px 14px;
  height: 100%;
  background-color: ${styledVariables.color.gray100};
  border-radius: 100px;

  > h3 {
    font-weight: 400;
    color: ${styledVariables.color.gray300};
  }
`;

export default StyledFeatureTag;
