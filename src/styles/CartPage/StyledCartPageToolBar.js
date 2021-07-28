/* eslint-disable prettier/prettier */
import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledCartPageToolBar = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  padding: 0 ${styledVariables.shared.contentPadding};
  background-color: ${styledVariables.color.white};

  button {
    height: 30px;
    padding: 0 15px;
    margin-right: 10px;
    border-radius: 100px;
    min-width: 70px;
    margin-left: 15px;
  }

  h3,
  p {
    display: inline-block;
  }

  > div {
    position: relative;
    /* border: solid black 1px; */
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;

    > .sumPriceText {
      display: inline-block;
      > :not(.sumPrice) {
        margin-left: 8px;
      }
      > .sumPrice {
        color: ${styledVariables.color.pink400};
        > * {
          margin-left: 4px;
        }
        > :first-:nth-of-type(h3) {
          margin-left: 8px;
        }
      }
    }

    > .buttonSelectAll {
      position: absolute;
      left: 0;
      margin-left: ${styledVariables.cartPage.cartedProductGroupByStore.shareMarginLeftAdjust};
      padding: 0;
      /* left: ${styledVariables.cartPage.cartedProductGroupByStore.sharedPaddingLeft}; */
      display: flex;
      align-items: center;
      > p {
        margin-left: calc(
          ${styledVariables.cartPage.cartedProductGroupByStore.sharedPaddingLeft} - 18px
        );
      }
    }

    > .buttonPayment {
      background-color: ${styledVariables.color.pink400};
      color: ${styledVariables.color.white};
    }

    > .buttonDeleteCard {
      background-color: ${styledVariables.color.gray250};
      color: ${styledVariables.color.white};
    }
  }
`;

export default StyledCartPageToolBar;

/*
  background-color: ${styledVariables.color.pink100};
  filter: drop-shadow(4px 2px 4px ${styledVariables.color.gray200});
*/
