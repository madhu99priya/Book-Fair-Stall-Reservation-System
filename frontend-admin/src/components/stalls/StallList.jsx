import React from 'react';
import StallCard from './StallCard.jsx';

export default function StallList({ stalls, onEdit }) {
  return (
    <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))' }}>
      {stalls.map((s) => (
        <StallCard key={s.id} stall={s} onEdit={onEdit} />
      ))}
    </div>
  );
}
