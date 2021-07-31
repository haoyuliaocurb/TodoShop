import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledProductPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  > .container {
    width: 100%;
    height: 100%;
    padding-top: ${styledVariables.shared.barHeight};
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    > .scroll {
      position: relative;
      width: 100%;
      height: 100%;
      max-width: ${styledVariables.shared.contentMaxWidth};
      /* border: black solid 1px; */
      > .content {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        padding-bottom: ${styledVariables.shared.barHeight};
        > .contentBlock {
          > .blockTitle {
            width: 100%;
            height: 30px;
            background-color: ${styledVariables.color.gray100};
            color: ${styledVariables.color.gray300};
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        > .productInfo {
          width: 100%;
          min-height: 360px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          > .imgProductInfo {
            position: relative;
            width: 100%;
            height: 360px;
            /* border: blue solid 1px; */
            display: flex;
            justify-content: center;

            @media (min-width: 720px) {
              width: 50%;
            }
            > .carousel {
              position: absolute;
              top: 0;
              bottom: 30px;
              left: 0;
              right: 0;
              margin: auto;
              width: 85%;
              max-width: 306px;
              height: 85%;
              max-height: 306px;
              /* border: black solid 1px; */
              > img {
                object-fit: cover;
                width: 100%;
                height: 100%;
              }
            }
            > .dotContainer {
              position: absolute;
              bottom: 14px;
              > .dot {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 100px;
                background-color: ${styledVariables.color.transGray50};
              }
              > :not(span:first-of-type) {
                margin-left: 8px;
              }
            }
          }
          > .textProductInfo {
            position: relative;
            /* border: black solid 1px; */
            width: 100%;
            display: flex;
            align-content: flex-end;
            flex-wrap: wrap;
            @media (min-width: ${styledVariables.productPage.contentBreakpoint}) {
              width: 50%;
            }
            .column {
              position: relative;
              width: 100%;
              min-height: 36px;
              /* border: black solid 1px; */
              display: flex;
              align-items: center;
              padding: 4px ${styledVariables.productPage.contentPaddingHor};
              line-height: 20px;
            }
            > .onTopInfo {
              @media (min-width: ${styledVariables.productPage.contentBreakpoint}) {
                position: absolute;
                top: 0;
              }
              > .title {
                align-self: start;
                > h2 {
                  font-weight: 400;
                  color: ${styledVariables.color.gray300};
                }
              }
              > .priceNActivity {
                > .textPrice {
                  color: ${styledVariables.color.pink400};
                  > .price {
                    margin-left: 6px;
                  }
                }
              }
            }
            > .commentNLike {
              > .iconLike {
                position: absolute;
                right: ${styledVariables.productPage.contentPaddingHor};
              }
            }
          }
        }
        > .productIntro {
          width: 100%;
          > p {
            padding: 12px ${styledVariables.productPage.contentPaddingHor};
            text-align: justify;
            text-indent: 26px;
            word-spacing: 2px;
            line-height: 16px;
          }
        }
      }
    }
  }
`;

export default StyledProductPage;
