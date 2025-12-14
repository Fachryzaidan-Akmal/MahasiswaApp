import React, { createContext, useEffect, useState } from 'react';
import { FirebaseAuth } from './firebase';
import { getUser, saveUser, clearUser } from './storage';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const u = await getUser();
      if (u) setUser(u);
    };

    loadUser();

    const unsub = FirebaseAuth.onAuthStateChanged(async (u) => {
      if (u) {
        const usr = { uid: u.uid, email: u.email };
        setUser(usr);
        await saveUser(usr);
      } else {
        setUser(null);
        await clearUser();
      }
      setLoading(false);
    });

    return unsub;
  }, []);

  const login = (email, password) =>
    FirebaseAuth.signInWithEmailAndPassword(email, password);

  const register = (email, password) =>
    FirebaseAuth.createUserWithEmailAndPassword(email, password);

  const logout = async () => {
    await FirebaseAuth.signOut();
    await clearUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}