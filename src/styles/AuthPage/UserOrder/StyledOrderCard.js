import styled from '@emotion/styled/macro';
import { styledVariables } from '../../app/cssMaterial';

const StyledOrderCard = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* border: black solid 1px; */
  border-radius: 8px;
  /* box-shadow: 2px 3px 10px 3px ${styledVariables.color.gray100}; */
  background-color: ${styledVariables.color.gray100};
  &:not(:first-of-type) {
    margin-top: 20px;
  }
  /* ::after {
    content: '';
    display: inline-block;
    width: 100%;
  } */
  .title {
    /* border: black solid 1px; */
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30px;
    margin-bottom: 16px;
  }
  .block {
    margin-top: 20px;
  }
  .orderProductsInfo {
    width: 100%;
    min-height: 200px;
    .ProductGroupByStore {
      margin: 0 26px;
      :not(.ProductGroupByStore:first-of-type) {
        margin-top: 20px;
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
      justify-content: flex-start;
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
  .ButtonSet {
    width: 100%;
    min-height: 20px;
    /* border: black solid 1px; */
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
    margin-top: 20px;
    .ButtonPayment {
      display: inline-block;
      /* width: 20px;
      height: 20px; */
      padding: 6px 20px;
      background-color: ${styledVariables.color.pink400};
      color: ${styledVariables.color.white};
      border-radius: 100px;
    }
  }
  .paddingButtom {
    width: 100%;
    height: 20px;
  }
`;

export default StyledOrderCard;
