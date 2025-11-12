import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import genresService from '../services/genresService.js';
import GenreForm from '../components/genres/GenreForm.jsx';
import GenreTable from '../components/genres/GenreTable.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import Input from '../components/common/Input.jsx';
import { pageHeaderStyles, filterBarStyles } from '../styles/designSystem.js';

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
      <div style={pageHeaderStyles.container}>
        <h1 style={pageHeaderStyles.title}>Genres</h1>
      </div>
      
      <GenreForm 
        onSubmit={handleSubmit} 
        loading={createMutation.isLoading || updateMutation.isPending}
        genre={editGenre}
        onCancel={() => setEditGenre(null)}
      />
      
      <div style={{ ...filterBarStyles.container, marginTop: '1rem' }}>
        <Input
          variant="search"
          type="text"
          placeholder="Search genres..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
