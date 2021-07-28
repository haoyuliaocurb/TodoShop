import styled from '@emotion/styled/macro';
import { styledVariables } from './cssMaterial';

const StyledIconSelectAll = styled.span`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  border: solid 1px ${styledVariables.color.gray250};
  border-radius: 100px;

  > span.dot {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: inline-block;
    width: 60%;
    height: 60%;
    background-color: ${styledVariables.color.gray250};
    border-radius: 100px;
  }
`;

export default StyledIconSelectAll;
