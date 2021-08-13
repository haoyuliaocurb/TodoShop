import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledWelcoming = styled.div`
  position: relative;
  width: 100%;
  height: ${styledVariables.HomePage.welcomingHeight};
  > nav {
    position: absolute;
    z-index: 5;
    top: 4px;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 60px;
    /* opacity: 0.7; */
    > .buttonItem {
      /* padding: 0 20px; */
      opacity: 0.7;
      @media (max-width: 1000px) {
        opacity: 0;
      }
      transition: all 0.3s;
      &:not(button:first-of-type) {
        margin-left: 30px;
      }
      :hover {
        text-decoration: line-through;
      }
    }
    > .buttonMenu {
      position: absolute;
      z-index: 20;
      right: 20px;
      /* border: black solid 1px; */
      width: 24px;
      height: 24px;
      opacity: 0;
      visibility: hidden;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      transition: all 0.3s;
      @media (max-width: 1000px) {
        opacity: 0.7;
        visibility: visible;
      }
      > span {
        display: inline-block;
        width: 100%;
        height: 2px;
        background-color: black;
        border-radius: 100px;
        margin: 1px 0;
        transition: 0.4s;
      }
      &.close {
        > span {
          background-color: ${styledVariables.color.white};
        }
        .buttonMenu-first {
          transform: rotate(-45deg) translate(-7px, 7px);
        }
        .buttonMenu-second {
          opacity: 0;
        }
        .buttonMenu-thrid {
          transform: rotate(45deg) translate(-7px, -7px);
        }
      }
    }
    > .sideMenu {
      position: absolute;
      right: 0;
      top: 18px;
      /* border: black 1px solid; */
      width: 200px;
      min-height: 400px;
      background-color: ${styledVariables.color.transGray80};
      padding-top: 80px;
      transition: all 0.3s;
      &.close {
        width: 0;
        > .sideMenuItem {
          opacity: 0;
        }
      }
      > .sideMenuItem {
        width: 100%;
        height: 40px;
        /* border: black solid 1px; */
        padding-right: 60px;
        color: ${styledVariables.color.white};
        font-weight: 300;
        transition: all 0.3s;
        &:hover {
          text-decoration: line-through;
        }
      }
    }
  }
  > .welcomingTitle {
    position: absolute;
    top: 16px;
    left: 60px;
    @media (max-width: 600px) {
      left: 20px;
    }
    > h1 {
      font-weight: 100;
      font-size: 40px;
      > span {
        display: inline-block;
        width: 100%;
        letter-spacing: 16px;
      }
      > .textStartFrom {
        @media (max-width: 600px) {
          font-size: 20px;
        }
        font-size: 26px;
        > span {
          display: inline-block;
          position: relative;
          font-weight: 400;
        }
        > .textTodolist {
          position: relative;
          z-index: 5;
          margin-left: 32px;
          margin-right: 80px;
          /* font-weight: 600; */
          @media (max-width: 600px) {
            margin-right: 0;
          }
        }
        > .textStart {
          /* font-weight: 400; */
          /* @media (max-width: 600px) {
            width: 100%;
            position: relative;
            left: 240px;
          } */
        }
      }
      > .textTodoShop {
        margin-top: 40px;
        font-size: 56px;
        letter-spacing: 4px;
        > .textTodo {
        }
        > .textShop {
          margin-left: 10px;
          font-style: italic;
          color: ${styledVariables.color.pink400};
        }
      }
      > .textInnovation {
        margin-left: 40px;
        font-size: 36px;
        /* margin-top: 10px; */
        @media (max-width: 800px) {
          font-size: 26px;
        }
        > .textInno {
          letter-spacing: 16px;
        }
        > .textWeb {
          margin-left: 20px;
          letter-spacing: 30px;
          @media (max-width: 800px) {
            display: inline-block;
            width: 100%;
            position: relative;
            right: 20px;
          }
        }
      }
    }
    > button {
      margin-top: 24px;
      border: white solid 1px;
      padding: 10px 20px;
      border-radius: 100px;
      background-color: black;
      display: flex;
      align-items: center;
      /* box-shadow: 2px 2px 5px 5px rgba(207, 185, 151, 0.5); */
      > p {
        display: inline-block;
        font-size: 20px;
        color: white;
        letter-spacing: 4px;
      }
      > svg {
        margin-left: 10px;
        width: 24px;
        height: 24px;
        fill: white;
        * {
          fill: white;
        }
      }
    }
  }
  > img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 80%;
  }
  > .divider {
    position: relative;
    width: 100%;
    height: 20%;
    background-color: black;
    overflow: hidden;
    > .line {
      position: absolute;
      top: 44px;
      left: 20px;
      display: inline-block;
      height: 5px;
      width: 860px;
      border-top: solid white 2px;
    }
    > h1 {
      color: white;
      font-size: 100px;
      font-weight: 100;
      /* font-style: italic; */
      letter-spacing: 20px;
      padding-left: 40px;
    }
    > .titleLeft {
      position: absolute;
      left: 20px;
    }
    > .titleRight {
      letter-spacing: -6px;
      position: absolute;
      right: -60px;
      font-style: italic;
    }
    > .hiddenWhenSmallScreen {
      @media (max-width: 1200px) {
        visibility: hidden;
      }
    }
  }
`;

export default StyledWelcoming;
