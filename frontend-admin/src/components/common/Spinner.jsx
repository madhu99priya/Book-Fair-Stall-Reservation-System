import React from 'react';

export default function Spinner({ size = 32 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #2563eb',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: 'auto'
      }}
    />
  );
}