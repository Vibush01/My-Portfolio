import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    setIsGuest(false);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function loginAsGuest() {
    setIsGuest(true);
    setCurrentUser({ email: 'guest@portfolio.admin', uid: 'guest' });
  }

  function logout() {
    setIsGuest(false);
    if (currentUser?.uid === 'guest') {
      setCurrentUser(null);
      return Promise.resolve();
    }
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Don't overwrite guest state if active
      if (!isGuest) {
        setCurrentUser(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [isGuest]);

  const value = {
    currentUser,
    isGuest,
    login,
    loginAsGuest,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
