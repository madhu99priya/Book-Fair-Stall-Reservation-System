// src/pages/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbarauth from "../components/Navbarauth";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await register(form);
      setSuccess("Registration successful! Redirecting to login...");
    } catch (err) {
      setError("Registration failed. Please check your details.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <Navbarauth />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        {error && (
          <div className="bg-red-600/50 text-red-100 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-600/50 text-green-100 px-4 py-2 rounded mb-4">
            {success}
          </div>
        )}

        <label className="block mb-2 font-semibold">Full Name</label>
        <input
          type="text"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-bold transition-all duration-200"
        >
          Register
        </button>
        <p className="mt-4 text-center text-gray-300">
          Have an account already?{" "}
          <a
            href="/login"
            className="text-blue-400 hover:underline"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
