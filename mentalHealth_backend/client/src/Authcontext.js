// src/contexts/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { auth } from './firebase.js';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, 
        async (firebaseUser) => {
      if (firebaseUser) {
        // Get the Firebase token
        const token = await firebaseUser.getIdToken();
        console.log(token)
        // You'll send this token to your backend
        const response = await fetch('https://project-serenity-8i86.onrender.com/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const userData = await response.json();
        console.log(userData)
        setUser(userData)
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    console.log(email,password)
    try {
    console.log(email,password)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      // Send user data to your backend
      await fetch('https://project-serenity-8i86.onrender.com/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email })
      });
    } catch (error) {
      throw error;
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};