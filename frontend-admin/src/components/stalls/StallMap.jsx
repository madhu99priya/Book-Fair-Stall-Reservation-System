import React from 'react';
import './StallMap.css';

/*
  This component would visualize stalls in a grid or custom map overlay.
  For now, it renders a grid of stall cells passed via props.
*/

export default function StallMap({ stalls, onSelect, selectedIds = [] }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '2px solid #60a5fa', borderRadius: '4px' }}></div>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)', border: '2px solid #9ca3af', borderRadius: '4px', opacity: 0.7 }}></div>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Reserved</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)', border: '2px solid #3b82f6', borderRadius: '4px' }}></div>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Selected</span>
        </div>
      </div>
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
    </div>
  );
}
