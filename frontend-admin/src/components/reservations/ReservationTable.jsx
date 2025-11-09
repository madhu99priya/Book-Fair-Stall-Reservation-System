import React from 'react';
import DataTable from '../common/DataTable.jsx';
import StatusBadge from '../common/StatusBadge.jsx';

export default function ReservationTable({ reservations, onRowClick }) {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'businessName', title: 'Business' },
    {
      key: 'stallNames',
      title: 'Stalls',
      render: (val, row) => row.stalls?.map((s) => s.name).join(', ')
    },
    {
      key: 'status',
      title: 'Status',
      render: (val) => <StatusBadge status={val} />
    },
    {
      key: 'createdAt',
      title: 'Created',
      render: (val) => new Date(val).toLocaleString()
    }
  ];
  return <DataTable columns={columns} data={reservations} onRowClick={onRowClick} />;
}