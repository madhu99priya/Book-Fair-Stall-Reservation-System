// src/api/api.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // token stored after login
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
