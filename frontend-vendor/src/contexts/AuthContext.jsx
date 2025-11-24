// AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8081/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const userData = await res.json();
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user on app load:", err);
        setToken("");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // login function
  const login = async (email, password) => {
    const res = await fetch("http://localhost:8081/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();
    setToken(data.token);
    localStorage.setItem("token", data.token);

    // Fetch current user
    const userRes = await fetch("http://localhost:8081/api/users/me", {
      headers: { Authorization: `Bearer ${data.token}` },
    });

    const userData = await userRes.json();
    setUser(userData);

    navigate("/reservation");
  };

  // register function
  const register = async (form) => {
    const res = await fetch("http://localhost:8081/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        fullName: form.fullname,
        email: form.email, 
        password: form.password
      }),
    });
    
    navigate("/login");
    if (!res.ok) {
      throw new Error("Registration failed");
    }
  }

  // logout function
  const logout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
