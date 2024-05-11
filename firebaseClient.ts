import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAFiOWLpzGkHAbbEwD2EZqg7gkmwk7t7mY",
    authDomain: "sih-super-set-dev.firebaseapp.com",
    projectId: "sih-super-set-dev",
    storageBucket: "sih-super-set-dev.appspot.com",
    messagingSenderId: "59512936420",
    appId: "1:59512936420:web:7318c5953be951659759f1"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };