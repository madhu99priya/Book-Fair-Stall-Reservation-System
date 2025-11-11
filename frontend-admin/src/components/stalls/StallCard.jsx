import React from 'react';
import StatusBadge from '../common/StatusBadge.jsx';

export default function StallCard({ stall, onEdit }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        padding: '0.75rem 0.9rem',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
      }}
    >
      <strong>{stall.name}</strong>
      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Size: {stall.size}</div>
      <StatusBadge status={stall.status?.toLowerCase() === 'reserved' ? 'RESERVED' : 'AVAILABLE'} />
      {onEdit && (
        <button
          onClick={() => onEdit(stall)}
          style={{
            marginTop: '0.5rem',
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            border: '1px solid #3b82f6',
            borderRadius: '4px',
            background: '#fff',
            color: '#3b82f6',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
}
