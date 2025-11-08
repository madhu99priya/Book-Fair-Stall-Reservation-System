// Reservation.jsx

import { useEffect, useState, useContext } from "react";
import StallMapScene from "../pages/StallMapScene";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/api"; // Axios wrapper with JWT

export default function Reservation() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stalls, setStalls] = useState([]);
  const [selectedStalls, setSelectedStalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(null); // {qrCodeUrl, reservedStalls}

  // Fetch stalls from backend
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchStalls = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/v1/stalls");
        setStalls(res.data);
      } catch (err) {
        console.error("Failed to fetch stalls", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStalls();
  }, [user, navigate]);

  const handleConfirmReservation = async () => {
    if (selectedStalls.length === 0) return alert("Select at least one stall!");
    try {
      const res = await axios.post("/api/v1/reservations", {
        stalls: selectedStalls.map((s) => s.id),
      });

      setConfirmation({
        qrCodeUrl: res.data.qrCodeUrl,
        reservedStalls: selectedStalls,
      });

      // Update stalls to reflect reservation
      setStalls((prev) =>
        prev.map((s) =>
          selectedStalls.find((sel) => sel.id === s.id)
            ? { ...s, reserved: true }
            : s
        )
      );

      // Clear selection
      setSelectedStalls([]);
    } catch (err) {
      console.error("Reservation failed", err);
      alert("Reservation failed. Please try again.");
    }
  };

  if (loading) return <div className="text-white p-8">Loading stalls...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6">Reserve Your Stall</h1>
      <p className="text-gray-300 mb-4">
        Select up to 3 stalls for your business.
      </p>

      <div className="w-full h-[500px] mb-6">
        <StallMapScene
          stalls={stalls}
          selectedStalls={selectedStalls}
          setSelectedStalls={setSelectedStalls}
          maxSelection={3}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleConfirmReservation}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold"
        >
          Confirm Reservation
        </button>
        <button
          onClick={() => setSelectedStalls([])}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold"
        >
          Clear Selection
        </button>
      </div>

      {/* Confirmation Modal */}
      {confirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 w-96 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Reservation Confirmed!</h2>
            <p className="mb-4">Your reserved stalls:</p>
            <ul className="mb-4 space-y-1">
              {confirmation.reservedStalls.map((s) => (
                <li key={s.id} className="text-green-400">
                  {s.name} ({s.size})
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <p className="mb-2">Your QR Pass:</p>
              <img
                src={confirmation.qrCodeUrl}
                alt="QR Code"
                className="w-48 h-48"
              />
            </div>
            <a
              href={confirmation.qrCodeUrl}
              download="QR_Pass.png"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold mb-2"
            >
              Download QR
            </a>
            <button
              onClick={() => setConfirmation(null)}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
