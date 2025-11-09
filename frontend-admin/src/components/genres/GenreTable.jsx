import React from 'react';
import DataTable from '../common/DataTable.jsx';

export default function GenreTable({ genres, onDelete }) {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <button style={{ background: '#ef4444', color: '#fff' }} onClick={() => onDelete(row.id)}>
          Delete
        </button>
      )
    }
  ];
  return <DataTable columns={columns} data={genres} />;
}