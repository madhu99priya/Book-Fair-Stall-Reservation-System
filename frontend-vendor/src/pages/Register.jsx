// src/pages/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbarauth from "../components/Navbarauth";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    contactNumber: ""
  });
  const [error, setError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      setShowSuccessDialog(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDialogOk = () => {
    setShowSuccessDialog(false);
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <Navbarauth />
      <div className="flex justify-center mt-20  w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-xl w-full sm:w-full md:w-1/2 lg:w-2/5 shadow-lg"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

          {error && (
            <div className="bg-red-600/50 text-red-100 px-4 py-2 rounded mb-4">
              {error}
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

          <label className="block mb-2 font-semibold">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={form.contactNumber}
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
      {showSuccessDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Success!</h2>
            <p className="mb-6">Registration successful!</p>
            <button
              onClick={handleDialogOk}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-bold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
