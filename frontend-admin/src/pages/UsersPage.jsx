import React from 'react';
import { useQuery } from '@tanstack/react-query';
import usersService from '../services/usersService.js';
import UserTable from '../components/users/UserTable.jsx';

export default function UsersPage() {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.list(),
  });

  return (
    <div>
      <h1>Users</h1>

      {isLoading && <p>Loading users...</p>}

      {isError && (
        <div style={{ color: 'crimson', marginBottom: '1rem' }}>
          Failed to load users: {error?.message || 'Unknown error'}
          <button style={{ marginLeft: '0.75rem' }} onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && <UserTable users={users} />}
    </div>
  );
}