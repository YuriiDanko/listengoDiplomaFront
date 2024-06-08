import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTrackContext } from './track';
import useSpotifyAuth from './spotify';
import { notifications } from '@mantine/notifications';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { removeTracks } = useTrackContext();
  const [user, setUser] = useState(() => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  });
  const { initiateAuth } = useSpotifyAuth();

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
    removeTracks();
    setUser(null);
  };

  const login = async (username, password) => {
    try {
      const res = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });
      setUser(res.data);
      initiateAuth();
      return res;
    } catch (e) {
      notifications.show({
        title: 'Auth Error',
        message: 'Username or password is incorrect. Try again!',
      });
    }
  };

  const register = async (username, email, password) => {
    console.log(username, password);
    try {
      const res = await axios.post('http://localhost:8080/auth/register', {
        username,
        email,
        password,
      });
      setUser(res.data);
      return res;
    } catch (e) {
      notifications.show({
        title: 'Auth Error',
        message: 'Username or Email is already taken!',
      });
    }
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
