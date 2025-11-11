import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import usersService from '../services/usersService.js';
import UserTable from '../components/users/UserTable.jsx';
import UserRoleEditor from '../components/users/UserRoleEditor.jsx';
import Modal from '../components/common/Modal.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [editUser, setEditUser] = useState(null);
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.list()
  });

  const updateRolesMutation = useMutation({
    mutationFn: ({ userId, roles }) => usersService.updateRoles(userId, roles),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setEditUser(null);
      addToast('User roles updated successfully', 'success');
    },
    onError: () => {
      addToast('Failed to update user roles', 'error');
    }
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch = searchTerm === '' ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || user.roles?.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      <h1>Users Management</h1>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            fontSize: '0.875rem'
          }}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            fontSize: '0.875rem',
            minWidth: '150px'
          }}
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="VENDOR">Vendor</option>
          <option value="USER">User</option>
        </select>
      </div>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <UserTable users={filteredUsers} onRowClick={(user) => setEditUser(user)} />
        </>
      )}
      <Modal
        open={!!editUser}
        title="Edit User Roles"
        onClose={() => setEditUser(null)}
      >
        <UserRoleEditor
          user={editUser}
          onSave={(roles) => updateRolesMutation.mutate({ userId: editUser.id, roles })}
          onCancel={() => setEditUser(null)}
          isLoading={updateRolesMutation.isPending}
        />
      </Modal>
    </div>
  );
}
