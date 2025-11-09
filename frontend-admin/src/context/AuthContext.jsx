import React, { createContext, useEffect, useState, useCallback } from 'react';
import { getStoredToken, storeToken, clearToken } from '../utils/storage.js';
import { decodeJwt } from '../utils/jwt.js';
import authService from '../services/authService.js';

export const AuthContext = createContext(null);

function getUserFromToken(token) {
  if (!token) return null;
  try {
    const claims = decodeJwt(token);
    // Optional: handle expiration
    const nowSec = Math.floor(Date.now() / 1000);
    if (claims?.exp && claims.exp < nowSec) return null;

    return {
      username: claims.sub,
      roles: Array.isArray(claims.roles) ? claims.roles : [],
    };
  } catch {
    return null;
  }
}

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(() => getUserFromToken(getStoredToken()));
  const [isInitializing, setInitializing] = useState(true);

  useEffect(() => {
    // Recompute user when token changes
    setUser(getUserFromToken(token));
    setInitializing(false);
  }, [token]);

  // Accepts login({ username, password }) OR login(username, password)
  const login = useCallback(async (arg1, arg2) => {
    const creds =
      typeof arg1 === 'object' && arg1 !== null
        ? { username: arg1.username, password: arg1.password }
        : { username: arg1, password: arg2 };

    const jwt = await authService.login(creds); // returns token and stores it
    // Ensure storage is in sync for interceptors that read from localStorage
    storeToken(jwt);
    setToken(jwt);

    // Optionally, you could fetch /auth/me here if you prefer server-sourced user details
    // const profile = await authService.me();
    // setUser({ username: profile.username, roles: profile.roles?.map(r => r.name) ?? [] });

    return jwt;
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
    isInitializing,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}