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
        console.error("Failed to fetch stalls", err);
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
        console.error("Failed to fetch user reservations", err);
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
      console.error("Reservation failed:", err);
      alert("Reservation failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen bg-gray-900 text-white flex items-center justify-center overflow-hidden">
        <Navbarauth />
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading stalls...</p>
        </div>
      </div>
    );

  return (
    <div className="h-screen bg-gray-900 text-white relative overflow-hidden">
      <Navbarauth />
      <div className="flex h-full">
        <div className="flex-1 p-6 pt-24 pr-80 flex flex-col">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2">Reserve Your Stall</h1>
            <p className="text-gray-300">
              Select up to {MAX_STALLS_PER_USER} stalls for your business.
            </p>
          </div>

          <div className="flex-1 min-h-0">
            <StallMapScene
              stalls={stalls}
              selectedStalls={selectedStalls}
              setSelectedStalls={setSelectedStalls}
              userBookedStalls={userBookedStalls}
              remainingLimit={remainingLimit}
              showLegend={false}
            />
          </div>
        </div>

        <div className="fixed right-0 top-20 w-72 h-[calc(100vh-5rem)] bg-gray-800 border-l border-gray-700 shadow-2xl z-40 flex flex-col">
          <div className="bg-gray-800 p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold text-center text-white">Reservation Control</h2>
          </div>
          
          <div className="flex-1 p-6 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Selection Status</h3>
                <div className="space-y-2">
                  <p className="text-sm flex justify-between">
                    <span>Selected:</span>
                    <span className="text-cyan-400 font-bold">{selectedStalls.length} / {MAX_STALLS_PER_USER}</span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span>Remaining:</span>
                    <span className="text-yellow-400 font-bold">{remainingLimit}</span>
                  </p>
                  {userBookedStalls.length > 0 && (
                    <p className="text-sm flex justify-between">
                      <span>Already booked:</span>
                      <span className="text-green-400 font-bold">{userBookedStalls.length}</span>
                    </p>
                  )}
                </div>
              </div>

              {selectedStalls.length > 0 && (
                <div className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">Selected Stalls</h3>
                  <ul className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedStalls.map((stall) => (
                      <li key={stall.id} className="text-sm bg-cyan-500/20 p-2 rounded flex justify-between items-center">
                        <span className="text-cyan-400 font-semibold">{stall.name}</span>
                        <span className="text-gray-300 text-xs">({stall.size})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Stall Legend</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                      <span>Selected</span>
                    </div>
                    <span className="text-gray-400">Click to deselect</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-500 rounded-sm"></div>
                      <span>Reserved</span>
                    </div>
                    <span className="text-gray-400">Unavailable</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-cyan-400 rounded-sm"></div>
                      <span>Available</span>
                    </div>
                    <span className="text-gray-400">Click to select</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 space-y-3 pt-4 border-t border-gray-600 mt-4">
              <button
                onClick={handleConfirmReservation}
                disabled={processing || selectedStalls.length === 0}
                className={`w-full px-6 py-4 rounded-lg font-bold transition-all duration-200 text-sm ${
                  processing || selectedStalls.length === 0
                    ? "bg-gray-600 cursor-not-allowed opacity-50" 
                    : "bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
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
                  `Confirm Reservation (${selectedStalls.length})`
                )}
              </button>

              <button
                onClick={() => setSelectedStalls([])}
                disabled={selectedStalls.length === 0}
                className={`w-full px-6 py-3 rounded-lg font-bold transition-all duration-200 text-sm ${
                  selectedStalls.length === 0
                    ? "bg-gray-700 opacity-50 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-600 hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      </div>

      {confirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md flex flex-col items-center border border-gray-600 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              Reservation Confirmed!
            </h2>
            <p className="mb-2 text-center text-gray-300">Your reserved stalls:</p>
            <ul className="mb-4 space-y-2 w-full">
              {confirmation?.reservedStalls?.map((s) => (
                <li key={s.id} className="text-green-400 bg-gray-700 p-2 rounded text-center">
                  <span className="font-bold">{s.name}</span> <span className="text-gray-300">({s.size})</span>
                </li>
              ))}
            </ul>
            <p className="mb-3 text-center text-gray-300">Your QR Pass:</p>
            <div className="bg-white p-4 rounded-lg mb-4">
              <img
                src={confirmation.qrCodeBase64}
                alt="QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <a
                href={confirmation.qrCodeBase64}
                download="Book_Fair_QR_Pass.png"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-center transition-colors"
              >
                Download QR Pass
              </a>
              <button
                onClick={() => {
                  setConfirmation(null);
                  navigate("/genre");
                }}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition-colors"
              >
                Continue to Genre Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}