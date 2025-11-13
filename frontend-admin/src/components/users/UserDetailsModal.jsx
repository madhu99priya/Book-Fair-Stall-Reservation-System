import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal.jsx';

export default function UserDetailsModal({ user, open, onClose, onSave, onDelete, isLoading }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        role: user.role || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === 'function') {
      onSave({ role: formData.role }); // Only send role update
    }
  };

  const handleDelete = () => {
    if (typeof onDelete !== 'function') return;
    if (window.confirm(`Are you sure you want to delete user "${user?.fullName}"? This action cannot be undone.`)) {
      onDelete();
    }
  };

  return (
    <Modal open={open} title="User Details" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            readOnly
            style={{
              backgroundColor: '#e5e7eb',
              color: '#6b7280',
              cursor: 'not-allowed'
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            style={{
              backgroundColor: '#e5e7eb',
              color: '#6b7280',
              cursor: 'not-allowed'
            }}
          />
        </div>

        {/* Role */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="EXHIBITOR">Exhibitor</option>
          </select>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', marginTop: '1.5rem' }}>
          {/* Delete */}
          {typeof onDelete === 'function' && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              style={{
                background: '#ef4444',
                border: '1px solid #ef4444',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              Delete User
            </button>
          )}

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {/* Cancel */}
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              style={{
                background: '#fff',
                color: '#374151',
                border: '1px solid #d1d5db',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              Cancel
            </button>

            {/* Save */}
            {typeof onSave === 'function' && (
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  background: '#3b82f6',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoading ? 'Saving...' : 'Save Role'}
              </button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}
