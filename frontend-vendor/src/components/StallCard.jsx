import React from 'react';

const StallCard = ({ stall, isSelected, onSelect, isPremium = false }) => {
  const getStallStatus = () => {
    if (stall.booked) return 'occupied';
    if (isSelected) return 'selected';
    return 'available';
  };

  const handleClick = () => {
    if (!stall.booked) {
      onSelect(stall);
    }
  };

  return (
    <div 
      className={`stall-card ${getStallStatus()} ${isPremium ? 'premium' : ''}`}
      onClick={handleClick}
    >
      <div className="stall-header">
        <span className="stall-id">{stall.stallNumber || stall.name}</span>
        {isPremium && <span className="premium-badge">★</span>}
      </div>
      
      <div className="stall-info">
        <div className="stall-size">{stall.size}</div>
        <div className="stall-price">₹{stall.price || stall.rentalPrice}</div>
      </div>
      
      {isSelected && (
        <div className="selected-indicator">✓</div>
      )}
    </div>
  );
};

export default StallCard;