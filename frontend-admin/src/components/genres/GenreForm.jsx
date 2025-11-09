import React, { useState } from 'react';

export default function GenreForm({ onSubmit, loading }) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim() });
    setName('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        placeholder="New genre name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Genre'}
      </button>
    </form>
  );
}