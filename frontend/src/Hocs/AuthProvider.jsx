/* eslint-disable react/jsx-no-constructed-context-values */

import { useState } from 'react';
import AuthContext from '../Contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(!!user);

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const getAuthHeader = () => ({ Authorization: `Bearer ${user?.token}` });

  const value = {
    user,
    loggedIn,
    logIn,
    logOut,
    getAuthHeader,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
