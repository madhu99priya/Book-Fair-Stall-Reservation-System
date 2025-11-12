import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import usersService from '../services/usersService.js';
import UserTable from '../components/users/UserTable.jsx';
import UserDetailsModal from '../components/users/UserDetailsModal.jsx';
import Modal from '../components/common/Modal.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import Input, { Select } from '../components/common/Input.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { pageHeaderStyles, filterBarStyles } from '../styles/designSystem.js';

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

  const updateUserMutation = useMutation({
    mutationFn: ({ userId, userData }) => usersService.update(userId, userData),
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
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || user.roles?.includes(roleFilter);
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
      <div style={pageHeaderStyles.container}>
        <h1 style={pageHeaderStyles.title}>Users Management</h1>
      </div>
      
      <div style={filterBarStyles.container}>
        <Input
          variant="search"
          type="text"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="VENDOR">Vendor</option>
          <option value="USER">User</option>
        </Select>
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
        onSave={(userData) => updateUserMutation.mutate({ userId: editUser.id, userData })}
        onDelete={() => deleteUserMutation.mutate(editUser.id)}
        isLoading={updateUserMutation.isPending || deleteUserMutation.isPending}
      />
    </div>
  );
}
