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
    onSave(formData);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete user "${user?.fullName}"? This action cannot be undone.`)) {
      onDelete();
    }
  };

  return (
    <Modal open={open} title="User Details" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

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
            <option value="VENDOR">Vendor</option>
            <option value="USER">User</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', marginTop: '1.5rem' }}>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            style={{
              background: '#ef4444',
              border: '1px solid #ef4444'
            }}
          >
            Delete User
          </button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              style={{
                background: '#fff',
                color: '#374151',
                border: '1px solid #d1d5db'
              }}
            >
              Cancel
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
