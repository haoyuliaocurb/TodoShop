/* eslint-disable prettier/prettier */
import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledTapPayFields = styled.form`
  position: relative;
  width: 100%;
  height: 250px;
  padding: 0 ${styledVariables.PaymentPage.formPaddingHor};
  /* border: black solid 1px; */
  .label {
    &.label:last-of-type {
      margin-bottom: calc( 20px + ${styledVariables.PaymentPage.ButtonSubmitHeight});
    }
    position: relative;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    margin-bottom: ${styledVariables.PaymentPage.labelMarginBottom};
    > p {
      display: inline-block;
    }
    > .tpfield {
      position: absolute;
      right: 0;
      display: inline-block;
      /* border: black solid 1px; */
      width: ${styledVariables.PaymentPage.inputWidth};
      height: 100%;
      border: ${styledVariables.color.gray200} solid 1px;
      border-radius: 4px;
      padding: 0 ${styledVariables.PaymentPage.inputPaddingHor};
    }
  }
  > button {
    position: absolute;
    bottom: 40px;
    right: 10px;
    height: ${styledVariables.PaymentPage.ButtonSubmitHeight};
    /* border: black solid 1px; */
    padding: 6px 20px;
    border-radius: 100px;
    background-color: ${styledVariables.color.pink400};
    color: ${styledVariables.color.white};
    > p {
      display: inline-block;
    }
  }
`;

export default StyledTapPayFields;
