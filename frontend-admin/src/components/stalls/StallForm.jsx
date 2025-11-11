import React, { useState, useEffect } from 'react';

export default function StallForm({ stall, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    location: ''
  });

  useEffect(() => {
    if (stall) {
      setFormData({
        name: stall.name || '',
        size: stall.size || '',
        location: stall.location || ''
      });
    }
  }, [stall]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
          Stall Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px'
          }}
          placeholder="e.g., A-01"
        />
      </div>

      <div>
        <label htmlFor="size" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
          Size *
        </label>
        <input
          type="text"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px'
          }}
          placeholder="e.g., SMALL, MEDIUM, LARGE"
        />
      </div>

      <div>
        <label htmlFor="location" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px'
          }}
          placeholder="e.g., Hall A, Row 1"
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            background: '#fff',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            background: '#3b82f6',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          {isLoading ? 'Saving...' : stall ? 'Update Stall' : 'Create Stall'}
        </button>
      </div>
    </form>
  );
}
