import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import reservationsService from '../services/reservationsService.js';
import ReservationTable from '../components/reservations/ReservationTable.jsx';
import Modal from '../components/common/Modal.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import Button from '../components/common/Button.jsx';
import Input, { Select } from '../components/common/Input.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { pageHeaderStyles, filterBarStyles } from '../styles/designSystem.js';

export default function ReservationsPage() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const { data: reservations = [], isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: () => reservationsService.list()
  });
  const [activeReservation, setActiveReservation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const cancelMutation = useMutation({
    mutationFn: (id) => reservationsService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      setActiveReservation(null);
      addToast('Reservation cancelled successfully', 'success');
    },
    onError: () => {
      addToast('Failed to cancel reservation', 'error');
    }
  });

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch = searchTerm === '' || 
      reservation.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id?.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ['ID', 'Business Name', 'Stalls', 'Status', 'Created At'];
    const rows = filteredReservations.map(r => [
      r.id,
      r.businessName || 'N/A',
      r.stalls?.map(s => s.name).join('; ') || '',
      r.status,
      new Date(r.createdAt).toLocaleString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reservations_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={pageHeaderStyles.container}>
        <h1 style={pageHeaderStyles.title}>Reservations</h1>
        <Button 
          variant="info"
          onClick={exportToCSV}
          disabled={filteredReservations.length === 0}
        >
          📊 Export to CSV
        </Button>
      </div>
      
      <div style={filterBarStyles.container}>
        <Input
          variant="search"
          type="text"
          placeholder="Search by business name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </Select>
      </div>
      {isLoading ? (
        <Skeleton variant="table" rows={8} columns={5} />
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
            {activeReservation.qrCodeBase64 && (
              <div style={{ 
                padding: '1rem', 
                background: '#f8fafc', 
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#1e293b' }}>QR Code</h3>
                <img 
                  src={`data:image/png;base64,${activeReservation.qrCodeBase64}`} 
                  alt="Reservation QR Code"
                  style={{ maxWidth: '200px', height: 'auto' }}
                />
              </div>
            )}
            
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
            
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button
                variant="secondary"
                onClick={() => setActiveReservation(null)}
              >
                Close
              </Button>
              <Button
                variant="error"
                onClick={() => {
                  if (window.confirm('Are you sure you want to cancel this reservation?')) {
                    cancelMutation.mutate(activeReservation.id);
                  }
                }}
                disabled={cancelMutation.isPending}
              >
                {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Reservation'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}