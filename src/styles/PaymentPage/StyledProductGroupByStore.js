/* eslint-disable no-template-curly-in-string */
/* eslint-disable prettier/prettier */
import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledProductGroupByStore = styled.div`
  width: calc (100% - 32px);
  overflow: hidden;
  display: ${({ visibility = 1 }) => {
    return !visibility ? 'none' : 'block';
  }};
  min-height: ${styledVariables.cartPage.cartedProductCard.minHeight};
  /* border: black solid 1px; */
  background-color: ${styledVariables.color.white};
  padding: 0 calc(${styledVariables.shared.contentPadding} / 2);
  margin: 0 calc(${styledVariables.shared.contentPadding} / 2 + ${styledVariables.cartPage.cartedProductGroupByStore.shareMarginLeftAdjust});
  box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.08);
  border-radius: 8px;

  &:not(*:first-of-type) {
    margin-top: 20px;
  }
  &div:last-of-type {
    margin-bottom: 20px;
  }

  > div:last-of-type {
    border-bottom: none;
  }
`;

export default StyledProductGroupByStore;

// width: ${({ visiblity }) => !visiblity ? 0 : 'calc (100% - 32px)'};
// overflow: hidden;
// display: ${({ visibility }) => !visibility ? 'none' : 'block'};
// min-height: ${({ visibility }) => !visibility ? 0 : styledVariables.cartPage.cartedProductCard.minHeight};
// /* border: black solid 1px; */
// background-color: ${styledVariables.color.white};
// padding: ${({ visibility }) => !visibility ? 0 : '0 calc(${styledVariables.shared.contentPadding} / 2)'};
// margin: 0 calc(${styledVariables.shared.contentPadding} / 2 + ${styledVariables.cartPage.cartedProductGroupByStore.shareMarginLeftAdjust});
// box-shadow: ${({ visibility }) => !visibility ? 'none' : '0 2px 5px 3px rgba(0, 0, 0, 0.08)'};
// border-radius: 8px;
