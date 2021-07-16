// script
import { React, useState } from 'react';
import { auth } from '../utils/firebase/firebase-services';
// import { auth } from '../utils/firebase/firebase-services';

// styling
import StyledAuthPage from '../styles/AuthPage/StyledAuthPage';

// test data
const USER_INFO_A = {
  email: 'jeffery84115@gmail.com',
  password: 'haoyuliao',
};
// const USER_INFO_B = {
//   email: 'trial@gmail.com',
//   password: 'trialtrial',
// };
const USER_INFO_TEST = USER_INFO_A;

const AuthPage = ({ isSignIn }) => {
  /*
  useEffect(async () => {
      let signInInfo = null;
  
      if (!signInInfo) {
        signInInfo = await auth.signInWithEmailAndPassword(
          'jeffery84115@gmail.com',
          'haoyuliao'
        );
      }
  }, [])
  */

  const [emailValue, setEmailValue] = useState(USER_INFO_TEST.email);
  const [passwordValue, setPasswordValue] = useState(USER_INFO_TEST.password);
  // let currentUser = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('trigger submit');
    auth.signInWithEmailAndPassword(emailValue, passwordValue);
  };

  const handleEmailInput = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPasswordValue(e.target.value);
  };

  /*
  const onAuthSubmit = async (emailValueInput, passwordValueInput) => {
    // console.log('trigger submit event');

    const signInResult = await auth.signInWithEmailAndPassword(emailValueInput, passwordValueInput);
    console.log('signInResult: ', signInResult);
    if (!signInResult) {
      // 顯示 sign in 失敗 modal
      // console.log('Fail to sign in');
      // currentUser.current = null;
      setIsSignIn(false);
      return;
    }

    // 顯示 sign in 成功 modal
    // console.log('Successfully sign in', 'signInResult: ', signInResult, 'type of signInResult: ', typeof(signInResult));
    // console.log(auth.currentUser);
    // currentUser.current = signInResult.user;
    setIsSignIn(signInResult.user.uid);
  };
  */

  return (
    <StyledAuthPage>
      <form onSubmit={handleSubmit}>
        <label htmlFor="AuthEmailInput">
          <span>email:</span>
          <input id="AuthEmailInput" value={emailValue} onInput={handleEmailInput} />
        </label>
        <label htmlFor="AuthPasswordInput">
          <span>password:</span>
          <input
            id="AuthPasswordInput"
            type="password"
            value={passwordValue}
            onInput={handlePasswordInput}
          />
        </label>
        <p>{!isSignIn ? '尚未登入' : `已登入，使用者 ${isSignIn}`}</p>
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => {
            auth.signOut();
          }}
        >
          Sign Out
        </button>
      </form>
    </StyledAuthPage>
  );
};

export default AuthPage;