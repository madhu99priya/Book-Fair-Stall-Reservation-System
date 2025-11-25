import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "../services/usersService.js";
import genresService from "../services/genresService.js";
import GenreForm from "../components/genres/GenreForm.jsx";
import GenreTable from "../components/genres/GenreTable.jsx";
import Skeleton from "../components/common/Skeleton.jsx";
import Modal from "../components/common/Modal.jsx";
import "./GenresPage.css";

export default function GenresPage() {
  const [editGenre, setEditGenre] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedGenre, setSelectedGenre] = React.useState(null);

  const queryClient = useQueryClient();

  const { data: genres = [], isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: () => genresService.list(),
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => usersService.list(),
    enabled: !!selectedGenre,
  });

  const filteredGenres = genres.filter(
    (genre) =>
      searchTerm === "" ||
      genre.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createMutation = useMutation({
    mutationFn: (payload) => genresService.createGenre(payload),
    onSuccess: () => {
      alert("Genre added successfully!");
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => genresService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      setEditGenre(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => genresService.deleteGenre(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["genres"] }),
  });

  const handleSubmit = (payload) => {
    if (editGenre) {
      updateMutation.mutate({ id: editGenre.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const usersForGenre = selectedGenre
    ? usersQuery.data?.filter((u) =>
        u.genres?.some((g) => g.id === selectedGenre.id)
      ) || []
    : [];

  return (
    <div className="genres-page">
      <div className="page-header">
        <h1 className="page-title">Genres Management</h1>
      </div>

      <div className="genre-form-container">
        <GenreForm
          onSubmit={handleSubmit}
          loading={createMutation.isLoading || updateMutation.isLoading}
          genre={editGenre}
          onCancel={() => setEditGenre(null)}
        />
      </div>

      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search genres..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <Skeleton variant="table" rows={6} columns={3} />
      ) : (
        <>
          <p className="results-count">
            Showing {filteredGenres.length} of {genres.length} genres
          </p>

          <div className="table-container">
            <GenreTable
              genres={filteredGenres}
              onDelete={(id) => {
                if (
                  window.confirm("Are you sure you want to delete this genre?")
                ) {
                  deleteMutation.mutate(id);
                }
              }}
              onEdit={(genre) => setEditGenre(genre)}
              onViewUsers={(genre) => setSelectedGenre(genre)}
            />
          </div>
        </>
      )}

      <Modal
        open={!!selectedGenre}
        onClose={() => setSelectedGenre(null)}
        title={`Users with Genre: ${selectedGenre?.name ?? ""}`}
      >
        {usersQuery.isLoading ? (
          <p style={{ color: "#94a3b8" }}>Loading users...</p>
        ) : usersForGenre.length === 0 ? (
          <p style={{ textAlign: "center", color: "#94a3b8" }}>
            No users belong to this genre.
          </p>
        ) : (
          <div style={{ overflowX: "auto", maxHeight: "60vh" }}>
            <table className="table-modern">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Genres</th>
                </tr>
              </thead>
              <tbody>
                {usersForGenre.map((u) => (
                  <tr key={u.id}>
                    <td>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td>{u.genres?.map((g) => g.name).join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </div>
  );
}
