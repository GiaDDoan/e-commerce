import React, { createContext, useEffect, useState } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyD5hw-6i9VnRn6SUWPfI164y_tGvM5bVb8',
  authDomain: 'e-commerce-97a43.firebaseapp.com',
  projectId: 'e-commerce-97a43',
  storageBucket: 'e-commerce-97a43.appspot.com',
  messagingSenderId: '559718155772',
  appId: '1:559718155772:web:51bdec10e547a299011e79',
  measurementId: 'G-34R5MWKPTC',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export const AppContext = createContext(null);

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState('');
  const handleSignOut = () => {
    signOut();
    setAppUser({});
    setMessage('');
  };

  useEffect(() => {
    if (user) {
      setAppUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }

    // if (user) {
    //   fetch(`/users`, {
    //     method: 'post',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       displayName: user.displayName,
    //       email: user.email,
    //       photoURL: user.photoURL,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((json) => {
    //       setAppUser(json.data);
    //       setMessage(json.message);
    //     });
    // }
  }, [user]);

  return (
    <AppContext.Provider value={{ appUser, signInWithGoogle, handleSignOut }}>
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
  firebaseApp,
})(AppProvider);
