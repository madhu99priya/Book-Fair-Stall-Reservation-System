// Genre Form

import { useState, useEffect } from 'react';

export default function GenreForm({ onSubmit, loading, genre, onCancel }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (genre) {
      setName(genre.name || '');
    }
  }, [genre]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim() });
    if (!genre) setName('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        placeholder={genre ? 'Edit genre name' : 'New genre name'}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {genre && (
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      )}
      <button type="submit" disabled={loading}>
        {loading ? (genre ? 'Saving...' : 'Adding...') : genre ? 'Save' : 'Add Genre'}
      </button>
    </form>
  );
}