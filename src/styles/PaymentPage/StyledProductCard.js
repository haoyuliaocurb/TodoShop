/* eslint-disable prettier/prettier */
import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledProductCard = styled.div`
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
    left: 80px;
    width: calc(100% - ${styledVariables.cartPage.cartedProductCard.imgProductWidth} - ${styledVariables.cartPage.cartedProductGroupByStore.sharedPaddingLeft});
    min-height: ${styledVariables.cartPage.cartedProductCard.minHeight};
    padding: 0 ${styledVariables.cartPage.cartedProductCard.productContentPaddingHor};
    display: flex;
    align-content: flex-end;
    flex-wrap: wrap;
    > * {
      width: 100%;
    }
    > .textName {
      position: absolute;
      top: 0;
      line-height: 18px;
    }
    > .textPrice {
      color: ${styledVariables.color.pink400};
    }
    > .textOthers {
      margin-bottom: 10px;
      * {
        font-weight: 400;
        color: ${styledVariables.color.gray300};
        font-size: 12px;
        &:not(*:last-of-type) {
          margin-bottom: 6px;
        }
      }
    }
  }
`;

export default StyledProductCard;
