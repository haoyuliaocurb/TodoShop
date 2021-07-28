/* eslint-disable prettier/prettier */
import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledStoreTitle = styled.div`
  position: relative;
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: blue solid 1px; */
  > h3 {
    width: 100%;
    height: 100%;
    border-bottom: ${styledVariables.color.pink400} solid 1px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: calc( ${styledVariables.cartPage.cartedProductGroupByStore.sharedPaddingLeft} + 4px);
    color: ${styledVariables.color.gray300};
  }

  > .iconSelectAll {
    position: absolute;
    left: 0;
  }
`;

export default StyledStoreTitle;
