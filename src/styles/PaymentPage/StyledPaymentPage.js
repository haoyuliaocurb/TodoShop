/* eslint-disable prettier/prettier */
import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledPaymentPage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  > .PaymentPageContent {
    width: 100%;
    height: calc(100% - ${styledVariables.shared.barHeight});
    padding: 0 ${styledVariables.shared.contentPadding};
    padding-top: ${styledVariables.shared.barHeight};
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    /* border: black solid 1px; */
    > .ScrollPaymentPageContent {
      padding: 20px 0;
      width: 100%;
      max-width: 700px;
    }
  }
  .title {
    /* border: black solid 1px; */
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
  }
  .block {
    &:not(.orderInfo) {
      margin-top: 40px;
    }
  }
  .orderProductsInfo {
    width: 100%;
    > .ButtonToggleProductCards {
      display: block;
      width: 100%;
      height: 40px;
      margin: 0 auto;
      border-bottom: solid 1px ${styledVariables.color.gray200};
      color: ${styledVariables.color.gray300};
      display: flex;
      align-items: center;
      justify-content: center;
      > p {
        position: relative;
        left: 4px;
        display: inline-block;
      }
      > svg {
        position: relative;
        left: 4px;
        margin-left: 6px;
        width: 16px;
        height: 16px;
      }
      &.clicked {
        > svg {
          transform: rotate(180deg);
        }
      }
    }
  }
  .orderInfo {
    width: 100%;
    > .column {
      width: calc(100% - ${styledVariables.PaymentPage.columnMarginHor} * 2);
      height: 30px;
      /* border-bottom: ${styledVariables.color.gray200} solid 1px; */
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 ${styledVariables.PaymentPage.columnMarginHor};
      > p {
        position: relative;
        width: ${styledVariables.PaymentPage.formWidth};
        height: 100%;
        /* border: solid blue 1px; */
        display: flex;
        align-items: center;
        padding-left: 80px;
        padding-right: ${styledVariables.PaymentPage.formPaddingHor};
        > .columnName {
          position: absolute;
          left: ${styledVariables.PaymentPage.formPaddingHor};
        }
        > .columnData {
          color: ${styledVariables.color.pink400};
          font-weight: 700;
          > :not(span:first-of-type) {
            margin-left: 4px;
          }
        }
      }
    }
  }
  .orderUserInfoBlock {
    width: ${styledVariables.PaymentPage.formWidth};
    margin-left: auto;
    margin-right: auto;
    /* border: blue solid 1px; */
    > .orderUserInfo {
      width: 100%;
      padding: 0 ${styledVariables.PaymentPage.formPaddingHor};
      > .lable {
        position: relative;
        display: inline-block;
        /* border: red solid 1px; */
        width: 100%;
        height: ${styledVariables.PaymentPage.labelHeight};
        display: flex;
        align-items: center;
        margin-bottom: ${styledVariables.PaymentPage.labelMarginBottom};
        > p {
          display: inline-block;
        }
        > input {
          position: absolute;
          right: 0;
          width: ${styledVariables.PaymentPage.inputWidth};
          height: 100%;
          outline: none;
          border: none;
          font-size: 12px;
          border: ${styledVariables.color.gray200} solid 1px;
          border-radius: 4px;
          padding: 0 ${styledVariables.PaymentPage.inputPaddingHor};
        }
      }
    }
  }
`;

export default StyledPaymentPage;
