import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledHomePage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* padding: ${styledVariables.shared.barHeight} 0; */

  > .container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    > .scroll {
      position: relative;
      width: 100%;
      padding-bottom: ${styledVariables.shared.barHeight};
      > .content {
        width: 100%;
        background-color: ${styledVariables.color.white};
        .divider {
          display: inline-block;
          letter-spacing: 10px;
          word-spacing: 10px;
        }
        > .carouselBlock {
          > .carouselTitle {
            position: relative;
            top: 14px;
            width: 100%;
            height: 120px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        }
        > .category {
          position: relative;
          width: 100%;
          padding: 20px 0;
          overflow-x: hidden;
          > .categoryTitle {
            width: 100%;
            height: ${styledVariables.shared.barHeight};
            margin-top: 30px;
            /* background-color: ${styledVariables.color.gray100}; */
            display: flex;
            justify-content: center;
            align-items: center;
          }
          > .CategoryCardsScrollContainer {
            width: 80%;
            height: 220px;
            margin: 0 auto;
            overflow-x: scroll;
            padding-top: 20px;

            @media (min-width: 600px) {
              width: 600px;
              margin: 0 auto;
            }

            @media (min-width: 800px) {
              width: 800px;
              margin: 0 auto;
            }

            > .CategoryCards {
              display: flex;
              flex-wrap: nowrap;
            }
          }
        }
        > .activityBlock {
          position: relative;
          > .activityTitle {
            width: 100%;
            height: ${styledVariables.shared.barHeight};
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 16px;
          }
          > .background {
            position: absolute;
            width: 100%;
            height: ${styledVariables.shared.barHeight};
            background-color: ${styledVariables.color.gray100};
          }
          > .activityBar {
            width: calc(100% - 20px);
            height: ${styledVariables.shared.barHeight};
            /* border: black solid 1px; */
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 10px;
            overflow-y: scroll;
            /* background-color: ${styledVariables.color.gray100}; */
            > .ActivityTags {
              position: relative;
              display: flex;
              flex-wrap: nowrap;
              /* background-color: ${styledVariables.color.gray100}; */
              @media (min-width: 600px) {
                width: 600px;
                margin: 0 auto;
              }

              @media (min-width: 800px) {
                width: 800px;
                margin: 0 auto;
              }
            }
          }
          > .SearchCardContainer {
            margin: 0 auto;
            padding-top: 20px;
            // border: black solid 1px;
            width: 400px;
            overflow-x: hidden;
            overflow-y: scroll;
            /* border: black solid 1px; */

            @media (max-width: 432px) {
              width: 100%;
              min-width: 360px;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }

            @media (min-width: 600px) {
              width: 600px;
              margin: 0 auto;
            }

            @media (min-width: 800px) {
              width: 800px;
              margin: 0 auto;
            }
          }
        }
      }
    }
    .Carousel {
      .IconLastImg {
        left: calc(10px + 2%);
      }
      .IconNextImg {
        right: calc(10px + 2%);
      }
    }
  }
`;

export default StyledHomePage;
