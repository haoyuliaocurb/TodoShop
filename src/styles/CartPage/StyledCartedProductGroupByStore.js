/* eslint-disable prettier/prettier */
import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledCartedProductGroupByStore = styled.div`
  width: calc (100% - 32px);
  min-height: ${styledVariables.cartPage.cartedProductCard.minHeight};
  /* border: black solid 1px; */
  background-color: ${styledVariables.color.white};
  padding: 0 calc(${styledVariables.shared.contentPadding} / 2);
  margin: 0 calc(${styledVariables.shared.contentPadding} / 2 + ${styledVariables.cartPage.cartedProductGroupByStore.shareMarginLeftAdjust});
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  > div:last-of-type {
    border-bottom: none;
  }
`;

export default StyledCartedProductGroupByStore;
