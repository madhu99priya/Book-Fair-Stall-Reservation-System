import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import reservationsService from '../services/reservationsService.js';
import ReservationTable from '../components/reservations/ReservationTable.jsx';
import Modal from '../components/common/Modal.jsx';

export default function ReservationsPage() {
  const { data: reservations = [], isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: () => reservationsService.list()
  });
  const [activeReservation, setActiveReservation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch = searchTerm === '' || 
      reservation.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id?.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1>Reservations</h1>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by business name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            fontSize: '0.875rem'
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            fontSize: '0.875rem',
            minWidth: '150px'
          }}
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
            Showing {filteredReservations.length} of {reservations.length} reservations
          </p>
          <ReservationTable
            reservations={filteredReservations}
            onRowClick={(r) => setActiveReservation(r)}
          />
        </>
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