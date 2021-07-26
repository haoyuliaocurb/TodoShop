import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// import * as firebaseui from 'firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseConfig = {
  apiKey: 'AIzaSyD_Bo3BYW-axF5GpUUEdsGKw-vtgFSFANE',
  authDomain: 'todoshop-5fd25.firebaseapp.com',
  databaseURL: 'https://todoshop-5fd25.firebaseio.com',
  projectId: 'todoshop-5fd25',
  // storageBucket: 'todoshop-5fd25.appspot.com',
  // messagingSenderId: 'SENDER_ID',
  appId: '1:171774189236:web:b1c066cb05389b2f6c01e1',
  // measurementId: 'G-MEASUREMENT_ID',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const firestore = app.firestore();

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

// // Initialize the FirebaseUI Widget using Firebase.
// const ui = new firebaseui.auth.AuthUI(auth);
// // The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig);

export { firebase, auth, firestore, uiConfig, StyledFirebaseAuth };
