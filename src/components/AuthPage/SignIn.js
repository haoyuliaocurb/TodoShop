import { React } from 'react';
import { useHistory } from 'react-router-dom';
import { uiConfig, StyledFirebaseAuth, firebase } from '../../utils/firebase/firebase-services';

const SignIn = ({ isSignIn }) => {
  const history = useHistory();
  const redirect2SiginIn = (isSignInValue) => {
    history.push(`/auth/uid/${isSignInValue}`);
  };

  return (
    <div>
      {!isSignIn ? (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      ) : (
        redirect2SiginIn(isSignIn)
      )}
    </div>
  );
};

export default SignIn;
