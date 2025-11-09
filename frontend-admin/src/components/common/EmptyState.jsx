import React from 'react';

export default function EmptyState({ title = 'No Data', message }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', background: '#fff', borderRadius: 8 }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      {message && <p style={{ color: '#64748b' }}>{message}</p>}
    </div>
  );
}