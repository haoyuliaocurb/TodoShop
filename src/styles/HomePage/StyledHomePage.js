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
    > .scroll {
      position: relative;
      width: 100%;
      padding-bottom: ${styledVariables.shared.barHeight};
      > .content {
        width: 100%;
        background-color: ${styledVariables.color.white};
        > .carousel {
          width: 100%;
          height: 300px;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        > .category {
          position: relative;
          width: 100%;
          height: 200px;
          padding: 20px 0;
          overflow-x: hidden;
          border-top: ${styledVariables.color.gray100} solid 10px;
          > .CategoryCardsScrollContainer {
            width: 80%;
            height: 100%;
            margin: 0 auto;
            overflow-x: scroll;

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
          > .activityBar {
            width: 100%;
            height: ${styledVariables.shared.barHeight};
            /* border: black solid 1px; */
            background-color: ${styledVariables.color.gray100};
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 10px;

            > .ActivityTags {
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
            overflow-y: scroll;
            /* border: black solid 1px; */

            @media (max-width: 432px) {
              width: 100%;
              min-width: 360px;
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
  }
`;

export default StyledHomePage;
