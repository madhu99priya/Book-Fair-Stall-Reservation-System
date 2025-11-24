import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import usersService from '../services/usersService.js';
import genresService from '../services/genresService.js';
import GenreForm from '../components/genres/GenreForm.jsx';
import GenreTable from '../components/genres/GenreTable.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import Modal from '../components/common/Modal.jsx';

export default function GenresPage() {
  const [editGenre, setEditGenre] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState(null);

  const queryClient = useQueryClient();

  const { data: genres = [], isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: () => genresService.list()
  });

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.list(),
    enabled: !!selectedGenre
  });

  const filteredGenres = genres.filter((genre) =>
    searchTerm === '' ||
    genre.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createMutation = useMutation({
    mutationFn: (payload) => genresService.createGenre(payload),
    onSuccess: () => {
      alert("Genre added successfully!");
      queryClient.invalidateQueries({ queryKey: ['genres'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => genresService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
      setEditGenre(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => genresService.deleteGenre(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['genres'] })
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
    <div>
      <h1>Genres</h1>

      <GenreForm 
        onSubmit={handleSubmit}
        loading={createMutation.isLoading || updateMutation.isLoading}
        genre={editGenre}
        onCancel={() => setEditGenre(null)}
      />

      <input
        type="text"
        placeholder="Search genres..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          fontSize: '0.875rem',
          marginBottom: '1rem'
        }}
      />

      {isLoading ? (
        <Skeleton variant="table" rows={6} columns={3} />
      ) : (
        <>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
            Showing {filteredGenres.length} of {genres.length} genres
          </p>

          <GenreTable
            genres={filteredGenres}
            onDelete={(id) => {
              if (window.confirm("Are you sure you want to delete this genre?")) {
                deleteMutation.mutate(id);
              }
            }}
            onEdit={(genre) => setEditGenre(genre)}
            onViewUsers={(genre) => setSelectedGenre(genre)}
          />
        </>
      )}

      <Modal
        open={!!selectedGenre}
        onClose={() => setSelectedGenre(null)}
        title={`Users with Genre: ${selectedGenre?.name ?? ''}`}
        style={{
          width: '60%',
          maxWidth: '95%',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: '1.5rem'
        }}
      >
        {usersQuery.isLoading ? (
          <p>Loading users...</p>
        ) : usersForGenre.length === 0 ? (
          <p className="text-gray-500 text-center">No users belong to this genre.</p>
        ) : (
          <div className="overflow-x-auto max-h-[60vh]">
            <table
              className="min-w-full border border-gray-200 rounded-lg text-left text-sm"
              style={{ tableLayout: 'fixed' }}
            >
              <colgroup>
                <col style={{ width: '30%' }} />
                <col style={{ width: '30%' }} />
                <col style={{ width: '40%' }} />
              </colgroup>
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="border-b px-4 py-3 font-medium text-gray-700 text-left">User</th>
                  <th className="border-b px-4 py-3 font-medium text-gray-700 text-left">Email</th>
                  <th className="border-b px-4 py-3 font-medium text-gray-700 text-left">Genres</th>
                </tr>
              </thead>
              <tbody>
                {usersForGenre.map((u, idx) => (
                  <tr
                    key={u.id}
                    className={`${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="border-b px-4 py-3 truncate">{u.fullName}</td>
                    <td className="border-b px-4 py-3 truncate">{u.email}</td>
                    <td className="border-b px-4 py-3 truncate">
                      {u.genres?.map((g) => g.name).join(', ')}
                    </td>
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
