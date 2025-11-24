import StatusBadge from '../common/StatusBadge.jsx';

export default function StallCard({ stall, onEdit, onDelete }) {
  const status = stall.status
    ? stall.status.toUpperCase()
    : stall.booked
    ? "BOOKED"
    : "AVAILABLE";

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        padding: '0.75rem 0.9rem',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
      }}
    >
      <strong>{stall.name}</strong>
      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Size: {stall.size}</div>

      <StatusBadge status={status} />

      <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem' }}>
        {onEdit && (
          <button
            onClick={() => onEdit(stall)}
            style={{
              flex: 1,
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              border: '1px solid #3b82f6',
              borderRadius: '4px',
              background: '#fff',
              color: '#3b82f6',
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(stall)}
            style={{
              flex: 1,
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              border: '1px solid #ef4444',
              borderRadius: '4px',
              background: '#fff',
              color: '#ef4444',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
