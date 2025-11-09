import React from 'react';
import './StallMap.css';

/*
  This component would visualize stalls in a grid or custom map overlay.
  For now, it renders a grid of stall cells passed via props.
*/

export default function StallMap({ stalls, onSelect, selectedIds = [] }) {
  return (
    <div className="stall-map">
      {stalls.map((stall) => {
        const isSelected = selectedIds.includes(stall.id);
        const reserved = stall.status === 'RESERVED';
        return (
          <div
            key={stall.id}
            className={`stall-cell ${reserved ? 'reserved' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => !reserved && onSelect(stall)}
            title={`Name: ${stall.name} | Size: ${stall.size}`}
          >
            {stall.name}
          </div>
        );
      })}
    </div>
  );
}