import React, { createContext, useEffect, useState, useCallback } from 'react';
import { getStoredToken, storeToken, clearToken } from '../utils/storage.js';
import { decodeJwt } from '../utils/jwt.js';
import authService from '../services/authService.js';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(null);
  const [isInitializing, setInitializing] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const claims = decodeJwt(token);
        setUser({ username: claims.sub, roles: claims.roles || [] });
      } catch {
        setUser(null);
      }
    }
    setInitializing(false);
  }, [token]);

  const login = useCallback(async (username, password) => {
    const jwt = await authService.login(username, password);
    storeToken(jwt);
    setToken(jwt);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    token,
    user,
    isAuthenticated: !!token && !!user,
    login,
    logout,
    isInitializing
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}