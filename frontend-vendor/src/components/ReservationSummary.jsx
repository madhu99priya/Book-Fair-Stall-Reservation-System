import React from 'react';

const ReservationSummary = ({ selectedStalls, onProceed, onClear }) => {
  console.log('ReservationSummary rendered with:', selectedStalls);
  
  const totalAmount = selectedStalls.reduce((sum, stall) => 
    sum + (stall.price || stall.rentalPrice || 0), 0
  );

  // Always show something for debugging
  if (selectedStalls.length === 0) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: 'orange',
        color: 'white',
        padding: '1rem',
        borderRadius: '10px'
      }}>
        No stalls selected - waiting for selection...
      </div>
    );
  }

  return (
    <div className="reservation-summary">
      <div className="summary-card">
        <h3>Reservation Summary</h3>
        <div className="selected-stalls">
          {selectedStalls.map((stall, index) => (
            <div key={stall.id || index} className="summary-item">
              <span>Stall {stall.stallNumber || stall.name || `Stall-${index}`}</span>
              <span>₹{stall.price || stall.rentalPrice || 0}</span>
            </div>
          ))}
        </div>
        <div className="total-amount">
          <strong>Total: ₹{totalAmount}</strong>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            className="clear-selection" 
            onClick={onClear}
            style={{ flex: 1 }}
          >
            Clear All
          </button>
          <button 
            className="proceed-button" 
            onClick={() => onProceed(selectedStalls, totalAmount)}
            style={{ flex: 2 }}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationSummary;