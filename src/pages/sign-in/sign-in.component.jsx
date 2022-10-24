import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.util';

const SignIn = () => {
  useEffect(() => {
    const fetchRedirectResult = async () => {
      const { user } = (await getRedirectResult(auth)) || {};
      if (user) {
        const userDocRef = createUserDocumentFromAuth(user);
        console.log('userDocRef::', userDocRef);
      }
    };

    fetchRedirectResult();
  }, []);

  const logGooglePopupUser = async () => {
    const { user } = await signInWithGooglePopup();
    if (user) {
      const userDocRef = createUserDocumentFromAuth(user);
      console.log('userDocRef::', userDocRef);
    }
  };

  return (
    <div>
      <h1>SignIn Page</h1>
      <button onClick={logGooglePopupUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  );
};

export default SignIn;
