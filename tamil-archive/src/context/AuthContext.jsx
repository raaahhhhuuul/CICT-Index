import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('ta_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const signin = (email, password) => {
    if (!email?.trim() || !password?.trim()) {
      throw new Error('மின்னஞ்சல் மற்றும் கடவுச்சொல் தேவை');
    }
    const u = { id: Date.now(), email: email.trim(), name: email.split('@')[0] };
    localStorage.setItem('ta_user', JSON.stringify(u));
    setUser(u);
    return u;
  };

  const signup = (name, email, password) => {
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      throw new Error('அனைத்து புலங்களும் தேவை');
    }
    const u = { id: Date.now(), email: email.trim(), name: name.trim() };
    localStorage.setItem('ta_user', JSON.stringify(u));
    setUser(u);
    return u;
  };

  const signout = () => {
    localStorage.removeItem('ta_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be within AuthProvider');
  return ctx;
};
