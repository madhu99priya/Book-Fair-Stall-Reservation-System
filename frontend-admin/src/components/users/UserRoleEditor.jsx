import React, { useState, useEffect } from 'react';

const AVAILABLE_ROLES = ['ADMIN', 'EXHIBITOR'];

export default function UserRoleEditor({ user, onSave, onCancel, isLoading }) {
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    if (user?.role) {
      setSelectedRole(user.role);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      onSave(selectedRole);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>User Information:</p>
        <p style={{ fontSize: '0.875rem', margin: '0.25rem 0' }}>
          <strong>Full Name:</strong> {user?.fullName}
        </p>
        <p style={{ fontSize: '0.875rem', margin: '0.25rem 0' }}>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Assign Role:</p>
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
                background: selectedRole === role ? '#f0f9ff' : '#fff'
              }}
            >
              <input
                type="radio"
                name="role"
                value={role}
                checked={selectedRole === role}
                onChange={() => setSelectedRole(role)}
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
          disabled={isLoading || !selectedRole}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            background: selectedRole ? '#3b82f6' : '#cbd5e1',
            color: '#fff',
            cursor: selectedRole ? 'pointer' : 'not-allowed'
          }}
        >
          {isLoading ? 'Saving...' : 'Save Role'}
        </button>
      </div>
    </form>
  );
}
