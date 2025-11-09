import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import stallsService from '../services/stallsService.js';
import StallMap from '../components/stalls/StallMap.jsx';
import StallList from '../components/stalls/StallList.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
// If you have an AuthContext with the logged-in business/user, you could import it:
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext.jsx';

export default function StallsPage() {
  const [selected, setSelected] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const queryClient = useQueryClient();

  // Example: derive businessId from auth (uncomment if available)
  // const { user } = useContext(AuthContext);
  // const businessId = user?.username; // or user.businessId if you store one
  const businessId = 'BUSINESS_ID_PLACEHOLDER';

  // v5 object form for useQuery
  const {
    data: stalls = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['stalls'],
    queryFn: () => stallsService.list(),
  });

  // v5 object form for useMutation
  const reserveMutation = useMutation({
    mutationFn: ({ stallIds }) => stallsService.reserve(stallIds, businessId),
    onSuccess: () => {
      // v5 invalidateQueries object form
      queryClient.invalidateQueries({ queryKey: ['stalls'] });
      setSelected([]);
      setConfirmOpen(false);
    },
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

      {isLoading && <p>Loading stalls...</p>}
      {isError && (
        <div style={{ color: 'crimson', marginBottom: '1rem' }}>
          Failed to load stalls: {error?.message || 'Unknown error'}
          <button onClick={() => refetch()} style={{ marginLeft: '1rem' }}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <StallMap stalls={stalls} selectedIds={selected} onSelect={handleSelect} />
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button
              disabled={
                !selected.length ||
                selected.length > 3 ||
                reserveMutation.isPending
              }
              onClick={() => setConfirmOpen(true)}
            >
              {reserveMutation.isPending
                ? 'Reserving...'
                : `Reserve Selected (${selected.length})`}
            </button>
            <button
              onClick={() => setSelected([])}
              disabled={!selected.length || reserveMutation.isPending}
            >
              Clear Selection
            </button>
          </div>

            {reserveMutation.isError && (
              <div style={{ color: 'crimson', marginTop: '0.75rem' }}>
                Reservation failed:{' '}
                {reserveMutation.error?.response?.data?.message ||
                  reserveMutation.error?.message ||
                  'Unknown error'}
              </div>
            )}

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