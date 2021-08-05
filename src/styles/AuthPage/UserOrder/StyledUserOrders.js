import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

const StyledUserOrders = styled.div`
  width: 100%;
  height: 100%;
  .orderTypeBar {
    width: 100%;
    height: 40px;
    position: relative;
    bottom: ${styledVariables.AuthPage.orderTypeBarBottom};
    /* border: black solid 1px; */
    > button {
      padding: 10px;
      height: 100%;
      &.selected {
        border-bottom: ${styledVariables.color.pink400} solid 2px;
      }
      &:not(button:first-of-type) {
        margin-left: 20px;
      }
    }
  }
  .OrderCardsContainer {
    width: 100%;
    height: calc(100% - ${styledVariables.AuthPage.orderTypeBarBottom} - 20px);
    border: blue solid 1px;
  }
`;

export default StyledUserOrders;
