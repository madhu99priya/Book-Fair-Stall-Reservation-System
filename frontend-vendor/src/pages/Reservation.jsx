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
      
      {/* Main content area */}
      <div className="flex h-full">
        {/* Left side - Map and title only, no legend */}
        <div className="flex-1 p-6 pt-24 pr-80 flex flex-col">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2">Reserve Your Stall</h1>
            <p className="text-gray-300">
              Select up to {MAX_STALLS_PER_USER} stalls for your business.
            </p>
          </div>

          {/* Map container - takes remaining space, NO LEGEND HERE */}
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

        {/* Right side - Control panel positioned below navbar */}
        <div className="fixed right-0 top-20 w-72 h-[calc(100vh-5rem)] bg-gray-800 border-l border-gray-700 shadow-2xl z-40 flex flex-col">
          {/* Control panel header */}
          <div className="bg-gray-800 p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold text-center text-white">Reservation Control</h2>
          </div>
          
          {/* Control panel content */}
          <div className="flex-1 p-6 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              {/* Selection info */}
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

              {/* Selected stalls list */}
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

              {/* Legend - only in control panel */}
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

            {/* Action buttons at bottom of panel */}
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

      {/* Balanced Size Confirmation Modal */}
      {confirmation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-600 w-full max-w-md mx-auto transform animate-slideUp">
            {/* Modal Header - Balanced spacing */}
            <div className="relative p-5 pb-3">
              {/* Success Icon - Medium size */}
              <div className="flex justify-center mb-4">
                <div className="w-18 h-18 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center text-green-400 mb-2">
                Reservation Confirmed!
              </h2>
              <p className="text-center text-gray-300 text-sm">
                Your booking has been successfully processed
              </p>
            </div>

            {/* Modal Content - Balanced spacing */}
            <div className="px-5 pb-5">
              {/* QR Code Section */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                  </svg>
                  Your Digital Entry Pass
                </h3>
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-5 rounded-xl shadow-inner">
                    <img
                      src={confirmation.qrCodeBase64}
                      alt="QR Code Entry Pass"
                      className="w-40 h-40 mx-auto"
                    />
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-gray-300 text-sm font-medium">
                    Present this QR code at the book fair entrance
                  </p>
                  <p className="text-gray-400 text-xs">
                    Save to your device for easy access
                  </p>
                </div>
              </div>

              {/* Action Buttons - Balanced spacing */}
              <div className="space-y-3">
                <a
                  href={confirmation.qrCodeBase64}
                  download="Book_Fair_QR_Pass.png"
                  className="w-full flex items-center justify-center px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Download QR Pass
                </a>
                
                <button
                  onClick={() => {
                    setConfirmation(null);
                    navigate("/genre");
                  }}
                  className="w-full px-5 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-lg font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Continue to Genre Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}