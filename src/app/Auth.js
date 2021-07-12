import {
    useState,
    useEffect,
} from 'react'
import {
    styledVariables,
} from './cssMaterial.js'
import {
    auth,
} from './firebase-services.js'
import styled from '@emotion/styled/macro'

const StyledAuth = styled.form`
    width: 100%;
    height: 100%;
    background-color: ${styledVariables.color.gray100};

    > label {
        width: 100%;
        display: inline-block;
        padding: 5px 20px;

        > input {
            margin-left: 10px;
        }
    }
`;

const Auth = (props) => {
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
        props.onAuthSubmit(props.emailValue, props.passwordValue);
    }

    const handleAuthEmailInput = (e) => {
        props.onAuthEmailInput(e.target.value);
    }

    const handleAuthPasswordInput = (e) => {
        props.onAuthPasswordInput(e.target.value);
    }

    return (
        <StyledAuth onSubmit={handleAuthSubmit} >
            <label>
                <span>email:</span>
                <input value={props.emailValue} onInput={handleAuthEmailInput} />
            </label>
            <label>
                <span>password:</span>
                <input type="password" value={props.passwordValue} onInput={handleAuthPasswordInput} />
            </label>
            <button type="submit"></button>
            <p>{props.isSignIn}</p>
        </StyledAuth>
    )
}

export default Auth