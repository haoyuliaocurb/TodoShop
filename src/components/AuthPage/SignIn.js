/* eslint-disable no-unused-vars */
import { React } from 'react';
import { useHistory } from 'react-router-dom';
import { uiConfig, StyledFirebaseAuth, firebase } from '../../utils/firebase/firebase-services';

import StyledSignIn from '../../styles/AuthPage/StyledSignIn';

const SignIn = ({ isSignIn }) => {
  const history = useHistory();
  const test = window.localStorage.getItem('TodoShopPreLocationFromSignIn');
  // console.log('test: ', test);

  return (
    <StyledSignIn>
      {!isSignIn ? (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
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
