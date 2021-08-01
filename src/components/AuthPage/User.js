/* eslint-disable consistent-return */
import { React } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../utils/firebase/firebase-services';

import StyledUser from '../../styles/AuthPage/StyledUser';

const User = ({ isSignIn }) => {
  // console.log('isSignIn: ', isSignIn);
  const history = useHistory();
  const redirect2SiginIn = () => {
    history.push('/auth/signIn');
  };
  // auth.currentUser();
  const handleButtonClick = async () => {
    await auth.signOut();
    redirect2SiginIn();
  };
  return (
    <StyledUser>
      {!isSignIn ? (
        redirect2SiginIn()
      ) : (
        <div className="userContent">
          <h2 className="welcoming">使用者 {isSignIn} 已登入</h2>
          <button type="button" onClick={handleButtonClick}>
            登出
          </button>
        </div>
      )}
    </StyledUser>
  );
};

export default User;
