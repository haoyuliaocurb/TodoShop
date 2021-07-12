import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

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

export { firebase, auth, firestore };
