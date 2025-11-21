import React from 'react';

const StallLegend = () => {
  const legendItems = [
    { color: 'available', label: 'Available' },
    { color: 'selected', label: 'Selected' },
    { color: 'occupied', label: 'Occupied' },
    { color: 'premium', label: 'Premium Location' }
  ];

  return (
    <div className="grid-legend">
      {legendItems.map((item) => (
        <div key={item.color} className="legend-item">
          <div className={`legend-color ${item.color}`}></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StallLegend;