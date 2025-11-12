import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import stallsService from '../services/stallsService.js';
import StallList from '../components/stalls/StallList.jsx';
import StallForm from '../components/stalls/StallForm.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import Modal from '../components/common/Modal.jsx';

export default function StallsPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editStall, setEditStall] = useState(null);
  const [deleteStall, setDeleteStall] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sizeFilter, setSizeFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: stalls = [], isLoading } = useQuery({
    queryKey: ['stalls'],
    queryFn: () => stallsService.list()
  });

  const createMutation = useMutation({
    mutationFn: (stallData) => stallsService.create(stallData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stalls'] });
      setCreateModalOpen(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => stallsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stalls'] });
      setEditStall(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => stallsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stalls'] });
      setDeleteStall(null);
    }
  });

  const filteredStalls = stalls.filter((stall) => {
    const matchesSearch = searchTerm === '' || stall.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || 
      (statusFilter === 'AVAILABLE' && !stall.booked) ||
      (statusFilter === 'RESERVED' && stall.booked);
    const matchesSize = sizeFilter === 'ALL' || stall.size === sizeFilter;
    return matchesSearch && matchesStatus && matchesSize;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>Stalls Management</h1>
        <button
          onClick={() => setCreateModalOpen(true)}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            background: '#10b981',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          + Create Stall
        </button>
      </div>
      
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search stalls by name..."
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
          <option value="AVAILABLE">Available</option>
          <option value="RESERVED">Reserved</option>
        </select>
        <select
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            fontSize: '0.875rem',
            minWidth: '150px'
          }}
        >
          <option value="ALL">All Sizes</option>
          <option value="SMALL">Small</option>
          <option value="MEDIUM">Medium</option>
          <option value="LARGE">Large</option>
        </select>
      </div>
      {isLoading ? (
        <p>Loading stalls...</p>
      ) : (
        <>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
            Showing {filteredStalls.length} of {stalls.length} stalls
          </p>
          <StallList 
            stalls={filteredStalls} 
            onEdit={(stall) => setEditStall(stall)}
            onDelete={(stall) => setDeleteStall(stall)}
          />
        </>
      )}
      <Modal
        open={createModalOpen}
        title="Create New Stall"
        onClose={() => setCreateModalOpen(false)}
      >
        <StallForm
          onSubmit={(data) => createMutation.mutate(data)}
          onCancel={() => setCreateModalOpen(false)}
          isLoading={createMutation.isPending}
        />
      </Modal>
      <Modal
        open={!!editStall}
        title="Edit Stall"
        onClose={() => setEditStall(null)}
      >
        <StallForm
          stall={editStall}
          onSubmit={(data) => updateMutation.mutate({ id: editStall.id, data })}
          onCancel={() => setEditStall(null)}
          isLoading={updateMutation.isPending}
        />
      </Modal>
      <ConfirmDialog
        open={!!deleteStall}
        message={`Are you sure you want to delete stall "${deleteStall?.name}"? This action cannot be undone.`}
        onCancel={() => setDeleteStall(null)}
        onConfirm={() => deleteMutation.mutate(deleteStall.id)}
      />
    </div>
  );
}
