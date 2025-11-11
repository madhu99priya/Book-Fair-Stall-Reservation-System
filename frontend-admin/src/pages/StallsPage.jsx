import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import stallsService from '../services/stallsService.js';
import StallMap from '../components/stalls/StallMap.jsx';
import StallList from '../components/stalls/StallList.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';

export default function StallsPage() {
  const [selected, setSelected] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: stalls = [], isLoading } = useQuery({
    queryKey: ['stalls'],
    queryFn: () => stallsService.list()
  });

  const reserveMutation = useMutation({
    mutationFn: ({ stallIds }) => stallsService.reserve(stallIds, 'BUSINESS_ID_PLACEHOLDER'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stalls'] });
      setSelected([]);
      setConfirmOpen(false);
    }
  });

  function handleSelect(stall) {
    setSelected((prev) =>
      prev.includes(stall.id) ? prev.filter((id) => id !== stall.id) : [...prev, stall.id]
    );
  }

  return (
    <div>
      <h1>Stalls</h1>
      <p>Select up to 3 available stalls to reserve.</p>
      {isLoading ? (
        <p>Loading stalls...</p>
      ) : (
        <>
          <StallMap stalls={stalls} selectedIds={selected} onSelect={handleSelect} />
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button
              disabled={!selected.length || selected.length > 3}
              onClick={() => setConfirmOpen(true)}
            >
              Reserve Selected ({selected.length})
            </button>
            <button onClick={() => setSelected([])} disabled={!selected.length}>
              Clear Selection
            </button>
          </div>

          <h2 style={{ marginTop: '2rem' }}>All Stalls</h2>
          <StallList stalls={stalls} />
        </>
      )}
      <ConfirmDialog
        open={confirmOpen}
        message={`Confirm reservation for stalls: ${selected.join(', ')}?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => reserveMutation.mutate({ stallIds: selected })}
      />
    </div>
  );
}