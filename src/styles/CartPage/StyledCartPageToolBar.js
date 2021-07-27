import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledCartPageToolBar = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  padding: 0 ${styledVariables.shared.contentPadding};
  /* background-color: bisque; */

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
        > :first-child {
          margin-left: 8px;
        }
      }
    }

    > .buttonSelectAll {
      position: absolute;
      left: 0;
      display: flex;
      align-items: center;
      > :not(:first-child) {
        margin-left: 8px;
      }
      > span {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        border: solid 1px ${styledVariables.color.gray250};
        border-radius: 100px;

        > span.dot {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          display: inline-block;
          width: 60%;
          height: 60%;
          background-color: ${styledVariables.color.gray250};
          border-radius: 100px;
        }
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
