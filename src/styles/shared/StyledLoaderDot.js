import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledLoaderDot = styled.div`
  // 移到 LoaderDotFullPageMask
  margin: auto;
  //
  width: 60px;
  height: 60px;
  /* border: black solid 1px; */
  display: flex;
  align-items: center;
  justify-content: center;
  > .dot {
    position: relative;
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: ${styledVariables.color.gray200};
    border-radius: 100px;
    bottom: 0;
    transition: all 1s;
    &.selected {
      background-color: ${styledVariables.color.gray300};
      bottom: 6px;
    }
    &:not(span:first-of-type) {
      margin-left: 6px;
    }
  }
`;

export default StyledLoaderDot;
