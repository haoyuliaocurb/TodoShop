/* eslint-disable consistent-return */
import { React } from 'react';
import { useHistory } from 'react-router-dom';

const User = ({ isSignIn }) => {
  const history = useHistory();
  const redirect2SiginIn = () => {
    history.push('/auth/signIn');
  };
  return (
    <div>
      {!isSignIn ? (
        redirect2SiginIn()
      ) : (
        <div>
          <p>已登入</p>
        </div>
      )}
    </div>
  );
};

export default User;
