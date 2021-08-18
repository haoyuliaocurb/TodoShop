/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {
  uiConfig,
  StyledFirebaseAuth,
  firebase,
  auth,
} from '../../utils/firebase/firebase-services';
import ModalMessageError from '../app/ModalMessageError';

import StyledSignIn from '../../styles/AuthPage/StyledSignIn';
import ModalMessageChecked from '../app/ModalMessageChecked';

const SignIn = ({ isSignIn, updateConfigNavBar }) => {
  const history = useHistory();
  const test = window.localStorage.getItem('TodoShopPreLocationFromSignIn');
  const [isShowSignUp, setIsShowSignUp] = useState(0);
  const [signUpInputValue, setSignUpInputValue] = useState({ email: '', password: '' });
  const ModalRefSuccessfullyCreateAccount = useRef(null);
  const ModalRefWeakPassword = useRef(null);
  const ModalRefEmailInUse = useRef(null);
  const ModalRefInvalidEmail = useRef(null);
  const ModalRefOperationNotAllowed = useRef(null);
  const handleButtonSignUp = (e) => {
    e.preventDefault();
    const { email, password } = signUpInputValue;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        ModalRefSuccessfullyCreateAccount.current.classList.remove('op-zero');
        ModalRefSuccessfullyCreateAccount.current.addEventListener(
          'transitionend',
          () => {
            ModalRefSuccessfullyCreateAccount.current.classList.add('op-zero');
          },
          { once: true },
        );
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case 'auth/email-already-in-use':
            ModalRefEmailInUse.current.classList.remove('op-zero');
            ModalRefEmailInUse.current.addEventListener(
              'transitionend',
              () => {
                ModalRefEmailInUse.current.classList.add('op-zero');
              },
              { once: true },
            );
            break;
          case 'auth/invalid-email':
            ModalRefInvalidEmail.current.classList.remove('op-zero');
            ModalRefInvalidEmail.current.addEventListener(
              'transitionend',
              () => {
                ModalRefInvalidEmail.current.classList.add('op-zero');
              },
              { once: true },
            );
            break;
          case 'auth/operation-not-allowed':
            ModalRefOperationNotAllowed.current.classList.remove('op-zero');
            ModalRefOperationNotAllowed.current.addEventListener(
              'transitionend',
              () => {
                ModalRefOperationNotAllowed.current.classList.add('op-zero');
              },
              { once: true },
            );
            break;
          case 'auth/weak-password':
            ModalRefWeakPassword.current.classList.remove('op-zero');
            ModalRefWeakPassword.current.addEventListener(
              'transitionend',
              () => {
                ModalRefWeakPassword.current.classList.add('op-zero');
              },
              { once: true },
            );
            break;
          default:
        }
      });
  };
  useEffect(() => {
    // console.log('signUpInputValue: ', signUpInputValue);
  }, [signUpInputValue]);
  useEffect(() => {
    updateConfigNavBar({ title: '會員登入及註冊', buttonName: null, handleButtonClick: null });
  }, []);
  return (
    <StyledSignIn>
      {!isSignIn ? (
        !isShowSignUp ? (
          <div className="background">
            <div className="dashBoard">
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              <p className="textToggle">
                <span>還沒有帳號嗎？</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsShowSignUp(1);
                  }}
                >
                  註冊
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="background-signUp">
            <div className="dashBoard-signUp">
              <form className="form-signUp" onSubmit={handleButtonSignUp}>
                <h1>註冊帳號</h1>
                <label htmlFor="textEmail">
                  <input
                    placeholder="Email"
                    id="textEmail"
                    value={signUpInputValue.email}
                    onInput={(e) => {
                      setSignUpInputValue((preSignUpInputValue) => {
                        const newSignUpInputValue = {
                          ...preSignUpInputValue,
                          email: e.target.value,
                        };
                        return newSignUpInputValue;
                      });
                    }}
                  />
                </label>
                <label htmlFor="textPassword">
                  <input
                    type="password"
                    placeholder="Password"
                    id="textPassword"
                    value={signUpInputValue.password}
                    onInput={(e) => {
                      setSignUpInputValue((preSignUpInputValue) => {
                        const newSignUpInputValue = {
                          ...preSignUpInputValue,
                          password: e.target.value,
                        };
                        return newSignUpInputValue;
                      });
                    }}
                  />
                </label>
                <button type="submit">註冊</button>
              </form>
              <p className="textToggle-signUp">
                <span>已經有帳號了嗎？</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsShowSignUp(0);
                  }}
                >
                  登入
                </button>
              </p>
            </div>
          </div>
        )
      ) : (
        <p>redirect ...</p>
      )}
      <ModalMessageError
        ModolMessagErrorRef={ModalRefEmailInUse}
        message={
          <span>
            該 Email
            <br />
            已被註冊
          </span>
        }
      />
      <ModalMessageError
        ModolMessagErrorRef={ModalRefInvalidEmail}
        message={
          <span>
            Email 格式
            <br />
            不正確
          </span>
        }
      />
      <ModalMessageError
        ModolMessagErrorRef={ModalRefOperationNotAllowed}
        message={
          <span>
            帳戶操作未成功
            <br />
            請聯繫客服
          </span>
        }
      />
      <ModalMessageError
        ModolMessagErrorRef={ModalRefWeakPassword}
        message={<span>請設定 6 個字元以上的密碼</span>}
      />
      <ModalMessageChecked
        ModolMessageCheckedeRef={ModalRefSuccessfullyCreateAccount}
        message={<span>已成功建立帳戶</span>}
      />
    </StyledSignIn>
  );
};

export default SignIn;

/*

        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      ) : (
        redirect2SiginIn(isSignIn)
      )}

    const preLocationFromSignIn = window.localStorage.getItem('TodoShopPreLocationFromSignIn');
    console.log('preLocationFromSignIn: ', preLocationFromSignIn);
    if (!preLocationFromSignIn) {
      console.log(true);
      history.push(`/auth/uid/${isSignInValue}`);
      return;
    }
    window.localStorage.removeItem('TodoShopPreLocationFromSignIn');
    const trial = window.localStorage.getItem('TodoShopPreLocationFromSignIn');
    console.log('trial: ', trial);
    history.push(preLocationFromSignIn);


*/
