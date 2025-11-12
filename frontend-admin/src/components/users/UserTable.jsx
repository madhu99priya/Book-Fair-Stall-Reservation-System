import React from 'react';
import DataTable from '../common/DataTable.jsx';

export default function UserTable({ users, onRowClick }) {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'fullName', title: 'Full Name' },
    { key: 'email', title: 'Email' },
    {
      key: 'role',
      title: 'Role',
      render: (val) => val || 'N/A'
    }
  ];

  return <DataTable columns={columns} data={users} onRowClick={onRowClick} />;
}
