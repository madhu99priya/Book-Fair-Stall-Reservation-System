// src/pages/Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      // Redirect handled in AuthContext
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <div className="bg-red-600/50 text-red-100 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <label className="block mb-2 font-semibold">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-bold transition-all duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
