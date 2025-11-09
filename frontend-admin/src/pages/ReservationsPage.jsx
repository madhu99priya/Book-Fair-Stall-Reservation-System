import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import reservationsService from '../services/reservationsService.js';
import ReservationTable from '../components/reservations/ReservationTable.jsx';
import Modal from '../components/common/Modal.jsx';

export default function ReservationsPage() {
  const { data: reservations = [], isLoading } = useQuery(['reservations'], () =>
    reservationsService.list()
  );
  const [activeReservation, setActiveReservation] = useState(null);

  return (
    <div>
      <h1>Reservations</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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