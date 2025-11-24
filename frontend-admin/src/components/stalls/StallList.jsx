import StallCard from './StallCard.jsx';

export default function StallList({ stalls, onEdit, onDelete, onSelect, selectedIds = [] }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: '0.75rem',
        gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))',
      }}
    >
      {stalls.map((stall) => {
        const status = stall.status || (stall.booked ? "BOOKED" : "AVAILABLE");

        return (
          <StallCard
            key={stall.id}
            stall={{ ...stall, status }}
            onEdit={onEdit}
            onDelete={onDelete}
            onClick={() => onSelect && onSelect(stall)}
            isSelected={selectedIds.includes(stall.id)}
          />
        );
      })}
    </div>
  );
}
