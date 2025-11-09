import React from 'react';
import DataTable from '../common/DataTable.jsx';

export default function UserTable({ users, onRowClick }) {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'username', title: 'Username' },
    { key: 'email', title: 'Email' },
    {
      key: 'roles',
      title: 'Roles',
      render: (val) => (Array.isArray(val) ? val.join(', ') : '')
    }
  ];

  return <DataTable columns={columns} data={users} onRowClick={onRowClick} />;
}