import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledCarousel = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: center;
  /* border: blue solid 1px; */
  > .CarouselContent {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 90%;
    /* border: black solid 1px; */
    > img {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      width: 100%;
      height: 100%;
      opacity: 1;
      transition: opacity 0.3s;

      &.transparent {
        opacity: 0;
      }
    }
    > .IconLastImg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 2%;
      margin: auto 0;
      width: 30px;
      height: 30px;
      opacity: 0.5;
      @media (max-width: 410px) {
        left: -14px;
      }
      @media (min-width: 720px) and (max-width: 820px) {
        left: -14px;
      }
      > .background {
        display: inline-block;
        position: absolute;
        top: -20%;
        left: -16%;
        content: '';
        display: inline-block;
        width: 140%;
        height: 140%;
        background-color: ${styledVariables.color.gray300};
        border-radius: 200px;
      }
      > svg {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 100%;
        height: 100%;
        fill: ${styledVariables.color.gray100};

        > * {
          fill: ${styledVariables.color.gray100};
        }
      }
    }
    > .IconNextImg {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 2%;
      margin: auto 0;
      width: 30px;
      height: 30px;
      opacity: 0.5;
      @media (max-width: 410px) {
        right: -14px;
      }
      @media (min-width: 720px) and (max-width: 820px) {
        right: -14px;
      }
      > .background {
        display: inline-block;
        position: absolute;
        top: -20%;
        right: -16%;
        content: '';
        display: inline-block;
        width: 140%;
        height: 140%;
        background-color: ${styledVariables.color.gray300};
        border-radius: 200px;
      }
      > svg {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 100%;
        height: 100%;
        fill: ${styledVariables.color.gray100};

        > * {
          fill: ${styledVariables.color.gray100};
        }
      }
    }
  }
  > .dotContainer {
    position: absolute;
    bottom: 3%;
    > .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 100px;
      background-color: ${styledVariables.color.transGray20};

      &.focused {
        background-color: ${styledVariables.color.transGray50};
      }
    }
    > :not(span:first-of-type) {
      margin-left: 8px;
    }
  }
`;

export default StyledCarousel;
