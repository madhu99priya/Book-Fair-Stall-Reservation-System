import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import reservationsService from '../services/reservationsService.js';
import ReservationTable from '../components/reservations/ReservationTable.jsx';
import Modal from '../components/common/Modal.jsx';

export default function ReservationsPage() {
  const [activeReservation, setActiveReservation] = useState(null);

  const {
    data: reservations = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['reservations'],
    queryFn: () => reservationsService.list(),
  });

  return (
    <div>
      <h1>Reservations</h1>

      {isLoading && <p>Loading...</p>}

      {isError && (
        <div style={{ color: 'crimson', marginBottom: '1rem' }}>
          Failed to load reservations: {error?.message || 'Unknown error'}
          <button style={{ marginLeft: '0.75rem' }} onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <ReservationTable
          reservations={reservations}
          onRowClick={(r) => setActiveReservation(r)}
        />
      )}

      <Modal
        open={!!activeReservation}
        title={`Reservation #${activeReservation?.id}`}
        onClose={() => setActiveReservation(null)}
      >
        {activeReservation && (
          <>
            <p>
              <strong>Business:</strong> {activeReservation.businessName}
            </p>
            <p>
              <strong>Stalls:</strong>{' '}
              {activeReservation.stalls.map((s) => s.name).join(', ')}
            </p>
            <p>
              <strong>Status:</strong> {activeReservation.status}
            </p>
            <p>
              <strong>Created:</strong>{' '}
              {new Date(activeReservation.createdAt).toLocaleString()}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}