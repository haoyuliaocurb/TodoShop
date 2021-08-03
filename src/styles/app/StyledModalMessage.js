/* eslint-disable prettier/prettier */
import styled from '@emotion/styled/macro';
import { styledVariables } from './cssMaterial';

const StyledModalMessage = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${({ isShowMask }) => !isShowMask ? 'transparent' : 'rgba(0, 0, 0, 0.5)'};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  opacity: 1;
  transition: all 1s;
  &.op-zero {
    opacity: 0 !important;
  }

  > .messageBox {
    position: relative;
    bottom: 40px;
    width: 200px;
    min-height: 200px;
    border-radius: 20px;
    background-color: ${styledVariables.color.transWhite95};
    box-shadow: 0 3px 10px 5px ${styledVariables.color.transGray5};

    > .img {
      position: relative;
      top: 14px;
      width: 100%;
      height: 120px;
      /* border: black solid 1px; */
      display: flex;
      justify-content: center;
      align-items: center;

      > svg {
        width: 80px;
        height: 80px;
        fill: ${styledVariables.color.gray270};
        * {
          fill: ${styledVariables.color.gray270};
        }
      }
    }
    > .message {
      padding: 20px 40px;
      font-weight: 400;
      text-align: center;
      line-height: 22px;
      color: ${styledVariables.color.gray300};
    }
  }
`;

export default StyledModalMessage;
