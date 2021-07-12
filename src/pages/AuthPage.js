// script
import { React } from 'react';
// import { auth } from '../utils/firebase/firebase-services';

// styling
import StyledAuthPage from '../styles/AuthPage/StyledAuthPage';

const AuthPage = ({
  emailValue,
  passwordValue,
  isSignIn,
  onAuthSubmit,
  onAuthEmailInput,
  onAuthPasswordInput,
}) => {
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

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    onAuthSubmit(emailValue, passwordValue);
  };

  const handleAuthEmailInput = (e) => {
    onAuthEmailInput(e.target.value);
  };

  const handleAuthPasswordInput = (e) => {
    onAuthPasswordInput(e.target.value);
  };

  return (
    <StyledAuthPage onSubmit={handleAuthSubmit}>
      <label htmlFor="AuthEmailInput">
        <span>email:</span>
        <input id="AuthEmailInput" value={emailValue} onInput={handleAuthEmailInput} />
      </label>
      <label htmlFor="AuthPasswordInput">
        <span>password:</span>
        <input
          id="AuthPasswordInput"
          type="password"
          value={passwordValue}
          onInput={handleAuthPasswordInput}
        />
      </label>
      <button type="button">button</button>
      <p>{isSignIn}</p>
    </StyledAuthPage>
  );
};

export default AuthPage;
