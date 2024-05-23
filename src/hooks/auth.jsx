import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [user, setUser] = useState(() => {
    // Initialize state from localStorage
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  });

  useEffect(() => {
    if (user && user.token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    console.log('logged out');
    setUser(null);
  };

  const login = async (username, password) => {
    console.log(username, password);
    const res = await axios.post('http://localhost:8080/auth/login', {
      username,
      password,
    });
    console.log(res.data.token);
    setUser(res.data);
    return res;
  };

  const register = async (username, email, password) => {
    console.log(username, password);
    const res = await axios.post('http://localhost:8080/auth/register', {
      username,
      email,
      password,
    });
    setUser(res.data);
    return res;
  };

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      register,
    }),
    [user],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
