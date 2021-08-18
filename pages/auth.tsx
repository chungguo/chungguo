import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyC-fhCaXq5GxzMBCHse1bXasTdmK5RWOqQ",
  authDomain: "website-chungguo.firebaseapp.com",
  projectId: "website-chungguo",
  storageBucket: "website-chungguo.appspot.com",
  messagingSenderId: "1031974021429",
  appId: "1:1031974021429:web:a544cb43883463cad4847c",
  measurementId: "G-HFR99VF68Q"
};

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // The redirect URL parameter name for the sign-in success URL
  queryParameterForSignInSuccessUrl: 'redirect',
  // We will display Google and Phone as auth providers.
  signInOptions: [
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        size: 'invisible',
      },
      // https://github.com/firebase/firebaseui-web/blob/master/javascript/data/README.md
      defaultCountry: 'CN'
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => true
  },
};

function initApp() {
  if (!firebase?.apps?.length) {
    firebase.initializeApp(config);
    return;
  }
  firebase.app();
}

initApp();

export default function Auth() {
  // Local signed-in state.
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  // Listen to the Firebase Auth state and set the local state.
  React.useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    // Make sure we un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  }, []);

  const signOut = React.useCallback(() => {
    firebase.auth().signOut()
  }, []);

  if (!isSignedIn) {
    return (
      <article>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </article>
    );
  }
  return (
    <div>
      <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
      <a onClick={signOut}>Sign-out</a>
    </div>
  );
}