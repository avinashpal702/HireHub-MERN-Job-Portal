import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    // optionally store token
    localStorage.setItem('token', data.token);
    return data;
  };

  const register = async payload => {
    const { data } = await axios.post('/api/auth/register', payload, { withCredentials: true });
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // optionally call backend logout endpoint
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);