import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import reservationsService from "../services/reservationsService.js";
import ReservationTable from "../components/reservations/ReservationTable.jsx";
import Modal from "../components/common/Modal.jsx";
import Skeleton from "../components/common/Skeleton.jsx";
import { useToast } from "../context/ToastContext.jsx";
import "./ReservationsPage.css";

export default function ReservationsPage() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const { data: reservations = [], isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: () => reservationsService.list(),
  });

  const [activeReservation, setActiveReservation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const cancelMutation = useMutation({
    mutationFn: (id) => reservationsService.cancel(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      if (activeReservation?.id === id) {
        setActiveReservation({ ...activeReservation, status: "CANCELLED" });
      }
      addToast("Reservation cancelled successfully", "success");
    },
    onError: () => {
      addToast("Failed to cancel reservation", "error");
    },
  });

  const confirmMutation = useMutation({
    mutationFn: (id) => reservationsService.confirm(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      if (activeReservation?.id === id) {
        setActiveReservation({ ...activeReservation, status: "CONFIRMED" });
      }
      addToast("Reservation confirmed successfully", "success");
    },
    onError: () => {
      addToast("Failed to confirm reservation", "error");
    },
  });

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      searchTerm === "" ||
      reservation.user.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      reservation.id?.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === "ALL" ||
      reservation.status === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ["ID", "Purchased By", "Stalls", "Status", "Reserved At"];
    const rows = filteredReservations.map((r) => [
      r.id,
      r.user.fullName || "N/A",
      r.stalls?.map((s) => s.name).join("; ") || "",
      r.status,
      new Date(r.reservedAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reservations_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="reservations-page">
      <div className="page-header">
        <h1 className="page-title">Reservations</h1>
        <button
          onClick={exportToCSV}
          disabled={filteredReservations.length === 0}
          className="export-btn"
        >
          📊 Export to CSV
        </button>
      </div>

      <div className="filters-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="BOOKED">Booked</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {isLoading ? (
        <Skeleton variant="table" rows={8} columns={5} />
      ) : (
        <>
          <p className="results-count">
            Showing {filteredReservations.length} of {reservations.length}{" "}
            reservations
          </p>
          <div className="table-wrapper">
            <ReservationTable
              reservations={filteredReservations}
              onRowClick={(r) => setActiveReservation(r)}
            />
          </div>
        </>
      )}

      <Modal
        open={!!activeReservation}
        title={`Reservation Details #${activeReservation?.id}`}
        onClose={() => setActiveReservation(null)}
      >
        {activeReservation && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {activeReservation.qrCodeBase64 && (
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(15, 23, 42, 0.6)",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(14, 165, 233, 0.2)",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 0.5rem 0",
                    fontSize: "1rem",
                    color: "#f1f5f9",
                  }}
                >
                  QR Code
                </h3>
                <img
                  src={`data:image/png;base64,${activeReservation.qrCodeBase64}`}
                  alt="Reservation QR Code"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              </div>
            )}

            <div
              style={{
                padding: "1rem",
                background: "rgba(15, 23, 42, 0.6)",
                borderRadius: "0.75rem",
                border: "1px solid rgba(14, 165, 233, 0.2)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "1rem",
                  color: "#f1f5f9",
                }}
              >
                User Information
              </h3>
              <p
                style={{
                  margin: "0.25rem 0",
                  fontSize: "0.875rem",
                  color: "#cbd5e1",
                }}
              >
                <strong>Name:</strong>{" "}
                {activeReservation.user.fullName || "N/A"}
              </p>
              <p
                style={{
                  margin: "0.25rem 0",
                  fontSize: "0.875rem",
                  color: "#cbd5e1",
                }}
              >
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    activeReservation.status === "CONFIRMED"
                      ? "badge-success"
                      : activeReservation.status === "CANCELLED"
                      ? "badge-danger"
                      : "badge-warning"
                  }`}
                >
                  {activeReservation.status}
                </span>
              </p>
            </div>

            <div
              style={{
                padding: "1rem",
                background: "rgba(15, 23, 42, 0.6)",
                borderRadius: "0.75rem",
                border: "1px solid rgba(14, 165, 233, 0.2)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "1rem",
                  color: "#f1f5f9",
                }}
              >
                Reserved Stalls
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                {activeReservation.stalls?.map((stall) => (
                  <span
                    key={stall.id}
                    style={{
                      padding: "0.25rem 0.75rem",
                      background: "rgba(14, 165, 233, 0.2)",
                      border: "1px solid rgba(14, 165, 233, 0.3)",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#7dd3fc",
                    }}
                  >
                    {stall.name}
                  </span>
                ))}
              </div>
              <p
                style={{
                  margin: "0.5rem 0 0 0",
                  fontSize: "0.875rem",
                  color: "#94a3b8",
                }}
              >
                Total: {activeReservation.stalls?.length || 0} stall(s)
              </p>
            </div>

            <div
              style={{
                padding: "1rem",
                background: "rgba(15, 23, 42, 0.6)",
                borderRadius: "0.75rem",
                border: "1px solid rgba(14, 165, 233, 0.2)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "1rem",
                  color: "#f1f5f9",
                }}
              >
                Timeline
              </h3>
              <p
                style={{
                  margin: "0.25rem 0",
                  fontSize: "0.875rem",
                  color: "#cbd5e1",
                }}
              >
                <strong>Created:</strong>{" "}
                {new Date(activeReservation.reservedAt).toLocaleString()}
              </p>
              {activeReservation.updatedAt && (
                <p
                  style={{
                    margin: "0.25rem 0",
                    fontSize: "0.875rem",
                    color: "#cbd5e1",
                  }}
                >
                  <strong>Last Updated:</strong>{" "}
                  {new Date(activeReservation.updatedAt).toLocaleString()}
                </p>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={() => setActiveReservation(null)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to cancel this reservation?"
                    )
                  ) {
                    cancelMutation.mutate(activeReservation.id);
                  }
                }}
                disabled={
                  cancelMutation.isPending ||
                  activeReservation.status === "CANCELLED"
                }
                className="btn btn-danger"
              >
                {cancelMutation.isPending
                  ? "Cancelling..."
                  : "Cancel Reservation"}
              </button>

              {activeReservation.status === "BOOKED" && (
                <button
                  onClick={() => {
                    if (window.confirm("Confirm this reservation?")) {
                      confirmMutation.mutate(activeReservation.id);
                    }
                  }}
                  disabled={confirmMutation.isPending}
                  className="btn btn-success"
                >
                  {confirmMutation.isPending
                    ? "Confirming..."
                    : "Confirm Reservation"}
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
