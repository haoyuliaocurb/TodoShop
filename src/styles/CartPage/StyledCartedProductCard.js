/* eslint-disable prettier/prettier */
import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledCartedProductCard = styled.div`
  position: relative;
  width: 100%;
  min-height: ${styledVariables.cartPage.cartedProductCard.minHeight};
  /* border: blue solid 1px; */
  padding-left: ${styledVariables.cartPage.cartedProductGroupByStore.sharedPaddingLeft};
  padding-top: ${styledVariables.cartPage.cartedProductCard.paddingTop};
  padding-bottom: 20px;
  border-bottom: solid ${styledVariables.color.gray200} 1px;
  > div {
    display: inline-block;
  }
  > .iconSelectAll {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin-top: 20px;
  }
  > .imgProduct { 
    min-height: ${styledVariables.cartPage.cartedProductCard.minHeight};
    width: ${styledVariables.cartPage.cartedProductCard.imgProductWidth};
    /* border: black solid 1px; */
    > img {
      object-fit: cover;
      width: ${styledVariables.cartPage.cartedProductCard.imgProductWidth};
      height: ${styledVariables.cartPage.cartedProductCard.imgProductWidth};
    }
  }

  > .productContent {
    position: absolute;
    top: ${styledVariables.cartPage.cartedProductCard.paddingTop};
    width: calc(100% - ${styledVariables.cartPage.cartedProductCard.imgProductWidth} - ${styledVariables.cartPage.cartedProductGroupByStore.sharedPaddingLeft});
    min-height: ${styledVariables.cartPage.cartedProductCard.minHeight};
    padding: 0 ${styledVariables.cartPage.cartedProductCard.productContentPaddingHor};

    > .buttonAdjustAmount {
      position: absolute;
      bottom: 0;
      right: 0;
      /* border: solid black 1px; */
      width: 96px;
      height: 20px;
      display: flex;
      align-items: center;
      background-color: ${styledVariables.color.gray200};
      border-radius: 100px;
      margin-right: 8px;
      > button {
        width: 28px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        > * {
          position: relative;
          bottom: 1px;
          left: 1px;
        }
      }
      > button.add {
        border-right: ${styledVariables.color.white} 2px solid;
      }
      > button.sub {
        border-left: ${styledVariables.color.white} 2px solid;
      }      
      > span {
        display: inline-block;
        width: calc(100% - 56px);
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;     
      }
    }

    > .textPrice {
      position: absolute;
      bottom: 0;
      left: ${styledVariables.cartPage.cartedProductCard.productContentPaddingHor};
      /* font-weight: 700; */
      color: ${styledVariables.color.pink400};
    }
  }
`;

export default StyledCartedProductCard;
