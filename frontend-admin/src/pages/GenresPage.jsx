import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import genresService from '../services/genresService.js';
import GenreForm from '../components/genres/GenreForm.jsx';
import GenreTable from '../components/genres/GenreTable.jsx';
import Skeleton from '../components/common/Skeleton.jsx';

export default function GenresPage() {
  const [editGenre, setEditGenre] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const queryClient = useQueryClient();
  const { data: genres = [], isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: () => genresService.list()
  });

  const filteredGenres = genres.filter((genre) =>
    searchTerm === '' || genre.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createMutation = useMutation({
    mutationFn: (payload) => genresService.createGenre(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['genres'] })
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

  return (
    <div>
      <h1>Genres</h1>
      <GenreForm 
        onSubmit={handleSubmit} 
        loading={createMutation.isLoading || updateMutation.isPending}
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
            onDelete={(id) => deleteMutation.mutate(id)}
            onEdit={(genre) => setEditGenre(genre)}
          />
        </>
      )}
    </div>
  );
}
