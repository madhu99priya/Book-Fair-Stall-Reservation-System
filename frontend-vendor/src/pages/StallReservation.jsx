import React, { useState, useEffect } from 'react';
import StallMapScene from './StallMapScene';
import StallCard from '../components/StallCard';
import StallLegend from '../components/StallLegend';
import MapLegend from '../components/MapLegend';
import ReservationSummary from '../components/ReservationSummary';
import '../styles/StallReservation.css';

const StallReservation = () => {
  const [stalls, setStalls] = useState([]);
  const [selectedStalls, setSelectedStalls] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or '3d'
  const [loading, setLoading] = useState(true);
  const [userBookedStalls, setUserBookedStalls] = useState([]);
  const remainingLimit = 3;

  useEffect(() => {
    fetchStalls();
    fetchUserBookedStalls();
  }, []);

  const fetchStalls = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/stalls');
      const stallData = await response.json();
      setStalls(stallData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stalls:', error);
      setLoading(false);
    }
  };

  const fetchUserBookedStalls = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/user/booked-stalls');
      const bookedData = await response.json();
      setUserBookedStalls(bookedData);
    } catch (error) {
      console.error('Error fetching user booked stalls:', error);
    }
  };

  const handleStallSelect = (stall) => {
    const isSelected = selectedStalls.find((s) => s.id === stall.id);

    if (isSelected) {
      setSelectedStalls(selectedStalls.filter((s) => s.id !== stall.id));
      return;
    }

    if (selectedStalls.length >= remainingLimit) {
      alert(`You can only select up to ${remainingLimit} stalls`);
      return;
    }

    setSelectedStalls([...selectedStalls, stall]);
  };

  const handleClearSelection = () => {
    setSelectedStalls([]);
  };

  const handleProceedToPayment = (stalls, totalAmount) => {
    // Navigate to payment page or handle payment logic
    console.log('Proceeding with stalls:', stalls, 'Total:', totalAmount);
  };

  const isPremiumStall = (stall) => {
    // Define logic for premium stalls (e.g., corner locations, main entrance, etc.)
    return stall.location === 'corner' || stall.location === 'main_entrance';
  };

  // Step 1: Debug logging - Add this before the return statement
  console.log('Debug - Selected Stalls:', selectedStalls);
  console.log('Debug - Selected Stalls Length:', selectedStalls.length);
  console.log('Debug - Current View Mode:', viewMode);

  if (loading) {
    return (
      <div className="stall-reservation-container">
        <div className="reservation-header">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="stall-reservation-container">
      {/* Step 1: Temporary debug display */}
      {selectedStalls.length > 0 && (
        <div style={{ 
          position: 'fixed', 
          top: '10px', 
          right: '10px', 
          background: 'red', 
          color: 'white', 
          padding: '10px',
          zIndex: 9999,
          borderRadius: '5px'
        }}>
          Debug: {selectedStalls.length} stalls selected
        </div>
      )}

      <div className="reservation-header">
        <h1>Reserve Your Stall</h1>
        <p>Select up to {remainingLimit} stalls for your business</p>
        <div className="selection-info">
          <span className="selected-count">
            {selectedStalls.length} of {remainingLimit} stalls selected
          </span>
          {selectedStalls.length > 0 && (
            <button className="clear-selection" onClick={handleClearSelection}>
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="view-toggle">
        <button 
          className={viewMode === 'grid' ? 'active' : ''}
          onClick={() => setViewMode('grid')}
        >
          Grid View
        </button>
        <button 
          className={viewMode === '3d' ? 'active' : ''}
          onClick={() => setViewMode('3d')}
        >
          3D Map View
        </button>
      </div>

      {/* Show different legends based on view mode */}
      {viewMode === 'grid' ? (
        <StallLegend />
      ) : (
        <MapLegend />
      )}

      {viewMode === 'grid' ? (
        <div className="stall-grid">
          {stalls.map((stall) => (
            <StallCard
              key={stall.id}
              stall={stall}
              isSelected={selectedStalls.find((s) => s.id === stall.id)}
              onSelect={handleStallSelect}
              isPremium={isPremiumStall(stall)}
            />
          ))}
        </div>
      ) : (
        <div className="map-container">
          <StallMapScene
            stalls={stalls}
            selectedStalls={selectedStalls}
            setSelectedStalls={setSelectedStalls}
            userBookedStalls={userBookedStalls}
            remainingLimit={remainingLimit}
          />
        </div>
      )}

      <ReservationSummary
        selectedStalls={selectedStalls}
        onProceed={handleProceedToPayment}
        onClear={handleClearSelection}
      />
    </div>
  );
};

export default StallReservation;