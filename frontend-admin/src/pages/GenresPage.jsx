import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import genresService from '../services/genresService.js';
import GenreForm from '../components/genres/GenreForm.jsx';
import GenreTable from '../components/genres/GenreTable.jsx';

export default function GenresPage() {
  const [editGenre, setEditGenre] = React.useState(null);
  const queryClient = useQueryClient();
  const { data: genres = [], isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: () => genresService.list()
  });

  const createMutation = useMutation({
    mutationFn: (payload) => genresService.create(payload),
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
    mutationFn: (id) => genresService.remove(id),
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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <GenreTable
          genres={genres}
          onDelete={(id) => deleteMutation.mutate(id)}
          onEdit={(genre) => setEditGenre(genre)}
        />
      )}
    </div>
  );
}
