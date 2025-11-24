import React, { useState, useEffect } from 'react';

export default function StallForm({ stall, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    price: '',
    x: '',
    z: ''
  });

  useEffect(() => {
    if (stall) {
      setFormData({
        name: stall.name || '',
        size: stall.size || '',
        price: stall.price ?? '',
        x: stall.x ?? '',
        z: stall.z ?? ''
      });
    }
  }, [stall]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      price: parseFloat(formData.price),
      x: formData.x !== '' ? parseFloat(formData.x) : null,
      z: formData.z !== '' ? parseFloat(formData.z) : null
    };
    console.log('Updating stall with:', updatedData);
    onSubmit(updatedData);
  };


  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Stall Name */}
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
          placeholder="e.g., A1"
        />
      </div>

      {/* Size */}
      <div>
        <label htmlFor="size" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
          Size *
        </label>
        <select
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
        >
          <option value="">Select size</option>
          <option value="SMALL">SMALL</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="LARGE">LARGE</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
          Price *
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px'
          }}
          placeholder="e.g., 5000.00"
        />
      </div>

      {/* Coordinates */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="x" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
            X Coordinate
          </label>
          <input
            type="number"
            id="x"
            name="x"
            value={formData.x}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px'
            }}
            placeholder="e.g., 10.0"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="z" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
            Z Coordinate
          </label>
          <input
            type="number"
            id="z"
            name="z"
            value={formData.z}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px'
            }}
            placeholder="e.g., 5.0"
          />
        </div>
      </div>

      {/* Buttons */}
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
