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
        title={`Reservation Details #${activeReservation?.id}`}
        onClose={() => setActiveReservation(null)}
      >
        {activeReservation && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem', 
              background: '#f8fafc', 
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#1e293b' }}>Business Information</h3>
              <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>
                <strong>Name:</strong> {activeReservation.businessName || 'N/A'}
              </p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>
                <strong>Status:</strong>{' '}
                <span style={{
                  padding: '0.125rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  background: activeReservation.status === 'CONFIRMED' ? '#dcfce7' : '#fef3c7',
                  color: activeReservation.status === 'CONFIRMED' ? '#166534' : '#854d0e'
                }}>
                  {activeReservation.status}
                </span>
              </p>
            </div>

            <div style={{ 
              padding: '1rem', 
              background: '#f8fafc', 
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#1e293b' }}>Reserved Stalls</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {activeReservation.stalls?.map((stall) => (
                  <span
                    key={stall.id}
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: '#fff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    {stall.name}
                  </span>
                ))}
              </div>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
                Total: {activeReservation.stalls?.length || 0} stall(s)
              </p>
            </div>

            <div style={{ 
              padding: '1rem', 
              background: '#f8fafc', 
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#1e293b' }}>Timeline</h3>
              <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>
                <strong>Created:</strong> {new Date(activeReservation.createdAt).toLocaleString()}
              </p>
              {activeReservation.updatedAt && (
                <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>
                  <strong>Last Updated:</strong> {new Date(activeReservation.updatedAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}