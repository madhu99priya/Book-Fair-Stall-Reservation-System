import React, { useState, useEffect } from 'react';

const AVAILABLE_ROLES = ['ADMIN', 'VENDOR', 'USER'];

export default function UserRoleEditor({ user, onSave, onCancel, isLoading }) {
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    if (user?.roles) {
      setSelectedRoles(user.roles);
    }
  }, [user]);

  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(selectedRoles);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>User Information:</p>
        <p style={{ fontSize: '0.875rem', margin: '0.25rem 0' }}>
          <strong>Username:</strong> {user?.username}
        </p>
        <p style={{ fontSize: '0.875rem', margin: '0.25rem 0' }}>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Assign Roles:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {AVAILABLE_ROLES.map((role) => (
            <label
              key={role}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                cursor: 'pointer',
                background: selectedRoles.includes(role) ? '#f0f9ff' : '#fff'
              }}
            >
              <input
                type="checkbox"
                checked={selectedRoles.includes(role)}
                onChange={() => toggleRole(role)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{role}</span>
            </label>
          ))}
        </div>
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
          disabled={isLoading || selectedRoles.length === 0}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            background: selectedRoles.length > 0 ? '#3b82f6' : '#cbd5e1',
            color: '#fff',
            cursor: selectedRoles.length > 0 ? 'pointer' : 'not-allowed'
          }}
        >
          {isLoading ? 'Saving...' : 'Save Roles'}
        </button>
      </div>
    </form>
  );
}
