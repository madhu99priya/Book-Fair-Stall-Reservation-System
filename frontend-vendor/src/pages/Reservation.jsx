// Reservation.jsx

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Navbarauth from "../components/Navbarauth";
import axios from "../api/api";
import StallMapScene from "./StallMapScene";

export default function Reservation() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stalls, setStalls] = useState([]);
  const [selectedStalls, setSelectedStalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [userBookedStalls, setUserBookedStalls] = useState([]);
  const MAX_STALLS_PER_USER = 3;

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }

    const fetchStalls = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/stalls");
        setStalls(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch stalls", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStalls();
  }, [user, navigate]);

  useEffect(() => {
    const fetchUserReservations = async () => {
      try {
        const res = await axios.get("/api/reservations/me");
        const bookedIds = res.data.flatMap(r => r.stalls.map(s => s.id));
        setUserBookedStalls(bookedIds);
      } catch (err) {
        console.error("❌ Failed to fetch user reservations", err);
      }
    };
    fetchUserReservations();
  }, []);

  const remainingLimit = MAX_STALLS_PER_USER - userBookedStalls.length;

  const handleConfirmReservation = async () => {
    if (selectedStalls.length === 0)
      return alert("Select at least one stall to reserve.");

    const confirmed = window.confirm(
      "Are you sure you want to confirm the stall reservation?"
    );
    if (!confirmed) return; 

    try {
      setProcessing(true);

      const stallIds = selectedStalls.map((s) => s.id);
      const res = await axios.post("/api/reservations", { stallIds });

      setConfirmation({
        reservedStalls: res.data.reservedStalls,
        qrCodeBase64: res.data.qrCodeBase64,
      });

      const stallsRes = await axios.get("/api/stalls");
      setStalls(stallsRes.data);

      const userRes = await axios.get("/api/reservations/me");
      const bookedIds = userRes.data.flatMap(r => r.stalls.map(s => s.id));
      setUserBookedStalls(bookedIds);

      setSelectedStalls([]);
    } catch (err) {
      console.error("❌ Reservation failed:", err);
      alert("Reservation failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return <div className="text-white text-center p-8">Loading stalls...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 pt-24">
      <Navbarauth />
      <h1 className="text-4xl font-bold mb-4">Reserve Your Stall</h1>
      <p className="text-gray-300 mb-6 text-center">
        Select up to {MAX_STALLS_PER_USER} stalls for your business.
      </p>

      <div className="w-full h-[500px] mb-6">
        <StallMapScene
          stalls={stalls}
          selectedStalls={selectedStalls}
          setSelectedStalls={setSelectedStalls}
          userBookedStalls={userBookedStalls}
          remainingLimit={remainingLimit}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleConfirmReservation}
          disabled={processing}
          className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
            processing ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {processing ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Confirm Reservation"
          )}
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
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              Reservation Confirmed!
            </h2>
            <p className="mb-2">Your reserved stalls:</p>
            <ul className="mb-4 space-y-1">
              {confirmation?.reservedStalls?.map((s) => (
                <li key={s.id} className="text-green-400">
                  {s.name} ({s.size})
                </li>
              ))}
            </ul>
            <p className="mb-2">Your QR Pass:</p>
            <img
              src={confirmation.qrCodeBase64}
              alt="QR Code"
              className="w-48 h-48 mb-4 border border-gray-600"
            />
            <a
              href={confirmation.qrCodeBase64}
              download="QR_Pass.png"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold mb-2"
            >
              Download QR
            </a>
            <button
              onClick={() => {
                setConfirmation(null);
                navigate("/genre");
              }}
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
