// StallsPage.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import stallsService from '../services/stallsService.js';
import StallMap from '../components/stalls/StallMap.jsx';
import StallList from '../components/stalls/StallList.jsx';
import StallForm from '../components/stalls/StallForm.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import Modal from '../components/common/Modal.jsx';

export default function StallsPage() {
  const [selected, setSelected] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editStall, setEditStall] = useState(null);
  const [deleteStall, setDeleteStall] = useState(null);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h1 style={{ margin: 0 }}>Stalls</h1>
          <p style={{ margin: '0.5rem 0 0 0' }}>Select up to 3 available stalls to reserve.</p>
        </div>
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
          <StallList
            stalls={stalls}
            onEdit={(stall) => setEditStall(stall)}
            onDelete={(stall) => setDeleteStall(stall)}
          />
        </>
      )}
      <ConfirmDialog
        open={confirmOpen}
        message={`Confirm reservation for stalls: ${stalls
          .filter((s) => selected.includes(s.id))
          .map((s) => s.name)
          .join(', ')}?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => reserveMutation.mutate({ stallIds: selected })}
      />

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
