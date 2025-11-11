import React from 'react';
import { useQuery } from '@tanstack/react-query';
import usersService from '../services/usersService.js';
import UserTable from '../components/users/UserTable.jsx';

export default function UsersPage() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.list()
  });

  return (
    <div>
      <h1>Users</h1>
      {isLoading ? <p>Loading users...</p> : <UserTable users={users} />}
    </div>
  );
}