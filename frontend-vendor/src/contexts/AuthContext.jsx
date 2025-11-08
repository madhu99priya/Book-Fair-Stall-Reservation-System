// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // {username, roles, ...}
  const [loading, setLoading] = useState(true);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile"); // backend endpoint to get user info
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      await fetchProfile();
      navigate("/reservation"); // redirect after login
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    }
  };

  const register = async (data) => {
    try {
      await api.post("/auth/register", data); // data: {username, email, password, businessName...}
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
