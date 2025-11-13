import React from 'react';
import DataTable from '../common/DataTable.jsx';
import StatusBadge from '../common/StatusBadge.jsx';

export default function ReservationTable({ reservations, onRowClick }) {
  const columns = [
    { key: 'id', title: 'ID' },
    {
      key: 'user',
      title: 'Purchased By',
      render: (_, row) => row.user?.fullName || 'N/A'
    },
    {
      key: 'stalls',
      title: 'Stalls',
      render: (_, row) => row.stalls?.map((s) => s.name).join(', ') || 'N/A'
    },
    {
      key: 'status',
      title: 'Status',
      render: (_, row) => <StatusBadge status={row.status} />
    },
    {
      key: 'reservedAt',
      title: 'Reserved At',
      render: (_, row) => new Date(row.reservedAt).toLocaleString()
    }
  ];

  return <DataTable columns={columns} data={reservations} onRowClick={onRowClick} />;
}
