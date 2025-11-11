import React from 'react';

export function SkeletonCard() {
  return (
    <div
      style={{
        background: '#f8fafc',
        borderRadius: '8px',
        padding: '1.5rem',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}
    >
      <div style={{ height: '20px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '1rem', width: '60%' }}></div>
      <div style={{ height: '32px', background: '#e2e8f0', borderRadius: '4px', width: '40%' }}></div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }) {
  return (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0' }}>
      {/* Header */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '1rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '2px solid #e2e8f0' }}>
        {Array.from({ length: columns }).map((_, i) => (
          <div key={`header-${i}`} style={{ height: '16px', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '1rem', marginBottom: '0.75rem' }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div 
              key={`cell-${rowIndex}-${colIndex}`} 
              style={{ 
                height: '14px', 
                background: '#f1f5f9', 
                borderRadius: '4px', 
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                animationDelay: `${(rowIndex + colIndex) * 0.1}s`
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3, width = '100%' }) {
  return (
    <div style={{ width }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            height: '16px',
            background: '#e2e8f0',
            borderRadius: '4px',
            marginBottom: '0.75rem',
            width: i === lines - 1 ? '70%' : '100%',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: `${i * 0.1}s`
          }}
        ></div>
      ))}
    </div>
  );
}

export default function Skeleton({ variant = 'card', ...props }) {
  switch (variant) {
    case 'table':
      return <SkeletonTable {...props} />;
    case 'text':
      return <SkeletonText {...props} />;
    case 'card':
    default:
      return <SkeletonCard {...props} />;
  }
}
