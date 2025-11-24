import React, { createContext, useEffect, useState, useCallback } from 'react';
import { getStoredToken, storeToken, clearToken } from '../utils/storage.js';
import { decodeJwt } from '../utils/jwt.js';
import authService from '../services/authService.js';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(null);
  const [isInitializing, setInitializing] = useState(true);

  // Decode JWT and set user on app load or token change
  useEffect(() => {
    if (token) {
      try {
        const claims = decodeJwt(token);
        // JWT should contain sub (email) and roles
        setUser({
          email: claims.sub,
          roles: claims.roles || []
        });
      } catch (err) {
        console.error('Failed to decode JWT:', err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setInitializing(false);
  }, [token]);

  // Login function using admin-only backend route
  const login = useCallback(async (email, password) => {
    const jwt = await authService.login(email, password); // calls /api/users/admin/login
    storeToken(jwt);
    setToken(jwt);
  }, []);

  // Logout function
  const logout = useCallback(() => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;
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
