import { useState, createContext, useEffect } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.util';

// as actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (user) => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      console.log('user::', user);
      if (user) {
        // save auth user to our users collection on the database
        await createUserDocumentFromAuth(user);
      }

      // save auth user to user context
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
