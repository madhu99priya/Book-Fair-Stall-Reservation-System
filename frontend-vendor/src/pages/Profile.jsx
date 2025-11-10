import { useEffect, useState, useContext } from "react";
import axios from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Fetch user data and reservations
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }

    const fetchUserAndReservations = async () => {
      try {
        setLoading(true);
        const resUser = await axios.get("http://localhost:8081/api/users/me");
        setUserData(resUser.data);
        setForm({
          fullName: resUser.data.fullName || "",
          email: resUser.data.email || "",
        });

        const resReservations = await axios.get(
          "http://localhost:8081/api/reservations/me"
        );
        setReservations(resReservations.data);
      } catch (err) {
        console.error("❌ Failed to fetch user data or reservations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndReservations();
  }, [user, navigate]);

  // Input handlers
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  // Update user info
  const handleUpdate = async () => {
    try {
      const res = await axios.put("http://localhost:8081/api/users/me", form);
      setUserData(res.data);
      setEditing(false);
      alert("User info updated!");
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Failed to update info. Try again.");
    }
  };

  // Change password
  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmNewPassword } = passwordForm;

    setPasswordError("");
    setPasswordSuccess("");

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return setPasswordError("Please fill in all fields.");
    }

    if (newPassword !== confirmNewPassword) {
      return setPasswordError("New password and confirmation do not match.");
    }

    try {
      await axios.put("http://localhost:8081/api/users/change-password", {
        oldPassword,
        newPassword,
      });

      setPasswordForm({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
      setPasswordSuccess("✅ Password changed successfully!");

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setPasswordSuccess("");
      }, 3000);
    } catch (err) {
      console.error("❌ Password change failed:", err);

      if (err.response?.status === 400 || err.response?.status === 401 || err.response?.status === 403) {
        setPasswordError(err.response.data.message || "❌ Incorrect old password.");
      } else {
        setPasswordError("Something went wrong. Please try again later.");
      }

      // Auto-hide error message after 3 seconds
      setTimeout(() => {
        setPasswordError("");
      }, 3000);
    }
  };

  // Cancel reservation
  const handleCancelReservation = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?"))
      return;
    try {
      await axios.delete(`http://localhost:8081/api/reservations/${id}`);
      setReservations(reservations.filter((r) => r.id !== id));
      alert("Reservation canceled successfully.");
    } catch (err) {
      console.error("❌ Cancel failed:", err);
      alert("Failed to cancel reservation. Try again.");
    }
  };

  if (loading)
    return <div className="text-white text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      {/* User Info Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>

            {/* Change Password Toggle */}
            <div>
              <button
                type="button"
                className="text-blue-400 hover:underline"
                onClick={() => setShowPassword(!showPassword)}
              >
                Change Password
              </button>
            </div>

            {showPassword && (
              <div className="space-y-3 mt-2">
                <div>
                  <label className="block mb-1">Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={passwordForm.confirmNewPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </div>

                {/* Feedback messages */}
                {passwordError && (
                  <p className="text-red-400 text-sm">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-green-400 text-sm">{passwordSuccess}</p>
                )}

                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                >
                  Save Password
                </button>
              </div>
            )}

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
              >
                Save Profile
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Full Name:</span> {userData.fullName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="mt-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Reservations Section */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">My Reservations</h2>
        {reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          <ul className="space-y-3">
            {reservations.map((res) => (
              <li
                key={res.id}
                className="flex justify-between items-center p-3 bg-gray-700 rounded"
              >
                <span>
                  {res.stall.name} ({res.stall.size}) -{" "}
                  {new Date(res.reservedAt).toLocaleString()}
                </span>
                <button
                  onClick={() => handleCancelReservation(res.id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
