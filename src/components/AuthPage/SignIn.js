/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  uiConfig,
  StyledFirebaseAuth,
  firebase,
  auth,
} from '../../utils/firebase/firebase-services';

import StyledSignIn from '../../styles/AuthPage/StyledSignIn';

const SignIn = ({ isSignIn, updateConfigNavBar }) => {
  const history = useHistory();
  const test = window.localStorage.getItem('TodoShopPreLocationFromSignIn');
  const [isShowSignUp, setIsShowSignUp] = useState(0);
  const [signUpInputValue, setSignUpInputValue] = useState({ email: '', password: '' });
  const handleButtonSignUp = (e) => {
    e.preventDefault();
    const { email, password } = signUpInputValue;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('successfully sign up');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          console.log('The password is too weak.');
        } else {
          console.log(errorMessage);
        }
        console.log(error);
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
