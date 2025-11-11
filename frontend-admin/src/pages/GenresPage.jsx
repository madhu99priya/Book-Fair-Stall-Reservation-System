import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import genresService from '../services/genresService.js';
import GenreForm from '../components/genres/GenreForm.jsx';
import GenreTable from '../components/genres/GenreTable.jsx';

export default function GenresPage() {
  const queryClient = useQueryClient();
  const { data: genres = [], isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: () => genresService.list()
  });

  const createMutation = useMutation({
    mutationFn: (payload) => genresService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['genres'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => genresService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['genres'] })
  });

  return (
    <div>
      <h1>Genres</h1>
      <GenreForm onSubmit={(p) => createMutation.mutate(p)} loading={createMutation.isLoading} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <GenreTable
          genres={genres}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      )}
    </div>
  );
}