import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import usersService from '../services/usersService.js';
import UserTable from '../components/users/UserTable.jsx';
import UserDetailsModal from '../components/users/UserDetailsModal.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import { useToast } from '../context/ToastContext.jsx';
import UserRoleEditor from '../components/users/UserRoleEditor.jsx'

const ITEMS_PER_PAGE = 10;

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [editUser, setEditUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.list()
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }) => usersService.updateRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setEditUser(null);
      addToast('User updated successfully', 'success');
    },
    onError: () => {
      addToast('Failed to update user', 'error');
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId) => usersService.delete(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setEditUser(null);
      addToast('User deleted successfully', 'success');
    },
    onError: () => {
      addToast('Failed to delete user', 'error');
    }
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch = searchTerm === '' ||
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter]);

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
          <option value="EXHIBITOR">Vendor</option>
        </select>
      </div>
      {isLoading ? (
        <Skeleton variant="table" rows={10} columns={4} />
      ) : (
        <>
          <UserTable users={paginatedUsers} onRowClick={(user) => setEditUser(user)} />
          {filteredUsers.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={filteredUsers.length}
            />
          )}
        </>
      )}
      <UserDetailsModal
        user={editUser}
        open={!!editUser}
        onClose={() => setEditUser(null)}
      >
        <UserRoleEditor
          user={editUser}
          onSave={(role) => updateRoleMutation.mutate({ userId: editUser.id, role })}
          onCancel={() => setEditUser(null)}
          isLoading={updateRoleMutation.isPending}
        />
      </UserDetailsModal>
    </div>
  );
}
