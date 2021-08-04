import styled from '@emotion/styled/macro';
import { styledVariables } from '../app/cssMaterial';

const StyledSignIn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .background {
    position: absolute;
    width: 100%;
    height: 60%;
    background-color: ${styledVariables.color.pink400};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @media (max-width: 600px) {
      justify-content: center;
    }
  }
  .background-signUp {
    position: absolute;
    width: 100%;
    height: 60%;
    background-color: ${styledVariables.color.pink400};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @media (max-width: 600px) {
      justify-content: center;
    }
  }
  .dashBoard {
    width: 300px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
  }
  .dashBoard-signUp {
    width: 300px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
  }
  .textToggle {
    width: 100%;
    text-align: center;
    margin-top: 40px;
    > * {
      font-size: 12px;
      color: ${styledVariables.color.white};
    }
    > span {
    }
    > button {
      margin-left: 6px;
      text-decoration: underline;
    }
    /* position: absolute;
    bottom: 50px;
    z-index: 2; */
  }
  .textToggle-signUp {
    width: 100%;
    text-align: center;
    margin-top: 40px;
    > * {
      font-size: 12px;
      color: ${styledVariables.color.white};
    }
    > span {
    }
    > button {
      margin-left: 6px;
      text-decoration: underline;
    }
    /* position: absolute;
    bottom: 50px;
    z-index: 2; */
  }
  .form-signUp {
    position: relative;
    width: 226px;
    height: 215px;
    background-color: ${styledVariables.color.white};
    border-radius: 6px;
    box-shadow: 2px 2px 2px ${styledVariables.color.transGray30};
    padding: 24px;
    > h1 {
      margin-bottom: 12px;
    }
    > label {
      display: inline-block;
      margin-top: 10px;
      border-bottom: solid 1px ${styledVariables.color.gray200};
      padding: 4px 0;
      > input {
        outline: none;
        border: none;
      }
    }
    > button {
      width: 88px;
      height: 36px;
      padding: 0 16px;
      background-color: ${styledVariables.color.pink400};
      color: ${styledVariables.color.white};
      border-radius: 100px;
      position: absolute;
      bottom: 24px;
      right: 24px;
      box-shadow: 2px 2px 2px ${styledVariables.color.transGray20};
    }
  }
  #firebaseui_container {
    /* position: relative;
    right: 10%;
    @media (max-width: 600px) {
      right: unset;
    } */
  }
  .firebaseui-form-actions {
    button {
      background-color: ${styledVariables.color.pink400};
      border-radius: 100px;
    }
  }
  .firebaseui-title {
    font-size: 18px;
  }
  .firebaseui-container {
    border-radius: 6px;
  }
`;

export default StyledSignIn;
