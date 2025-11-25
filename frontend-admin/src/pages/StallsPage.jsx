import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import stallsService from "../services/stallsService.js";
import StallMap from "../components/stalls/StallMap.jsx";
import StallList from "../components/stalls/StallList.jsx";
import StallForm from "../components/stalls/StallForm.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";
import Modal from "../components/common/Modal.jsx";
import "./StallsPage.css";

export default function StallsPage() {
  const [selected, setSelected] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editStall, setEditStall] = useState(null);
  const [deleteStall, setDeleteStall] = useState(null);
  const queryClient = useQueryClient();

  const { data: stalls = [], isLoading } = useQuery({
    queryKey: ["stalls"],
    queryFn: () => stallsService.list(),
  });

  const createMutation = useMutation({
    mutationFn: (stallData) => stallsService.create(stallData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stalls"] });
      setCreateModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => stallsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stalls"] });
      setEditStall(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => stallsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stalls"] });
      setDeleteStall(null);
    },
  });

  const reserveMutation = useMutation({
    mutationFn: ({ stallIds }) =>
      stallsService.reserve(stallIds, "BUSINESS_ID_PLACEHOLDER"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stalls"] });
      setSelected([]);
      setConfirmOpen(false);
    },
  });

  function handleSelect(stall) {
    if (stall.booked) return;

    setSelected((prev) =>
      prev.includes(stall.id)
        ? prev.filter((id) => id !== stall.id)
        : [...prev, stall.id]
    );
  }

  return (
    <div className="stalls-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Stalls</h1>
          <p className="page-subtitle">
            Select up to 3 available stalls to reserve.
          </p>
        </div>
        <button onClick={() => setCreateModalOpen(true)} className="create-btn">
          + Create Stall
        </button>
      </div>

      {isLoading ? (
        <p style={{ color: "#94a3b8" }}>Loading stalls...</p>
      ) : (
        <>
          <div className="stall-map-container">
            <StallMap
              stalls={stalls}
              selectedIds={selected}
              onSelect={handleSelect}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            <button
              disabled={!selected.length || selected.length > 3}
              onClick={() => setConfirmOpen(true)}
              className="btn btn-primary"
            >
              Reserve Selected ({selected.length})
            </button>
            <button
              onClick={() => setSelected([])}
              disabled={!selected.length}
              className="btn btn-secondary"
            >
              Clear Selection
            </button>
          </div>

          <div className="all-stalls-section">
            <h2 className="section-title">All Stalls</h2>
            <StallList
              stalls={stalls.map((stall) => ({
                ...stall,
                status: stall.status || (stall.booked ? "BOOKED" : "AVAILABLE"),
              }))}
              onEdit={(stall) => setEditStall(stall)}
              onDelete={(stall) => setDeleteStall(stall)}
              onSelect={handleSelect}
              selectedIds={selected}
            />
          </div>
        </>
      )}

      <ConfirmDialog
        open={confirmOpen}
        message={`Confirm reservation for stalls: ${stalls
          .filter((s) => selected.includes(s.id))
          .map((s) => s.name)
          .join(", ")}?`}
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
