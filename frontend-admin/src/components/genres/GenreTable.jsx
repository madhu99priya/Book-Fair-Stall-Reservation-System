import React from 'react';
import DataTable from '../common/DataTable.jsx';

export default function GenreTable({ genres, onDelete, onEdit }) {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            style={{ background: '#3b82f6', color: '#fff', padding: '0.25rem 0.75rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }} 
            onClick={() => onEdit(row)}
          >
            Edit
          </button>
          <button 
            style={{ background: '#ef4444', color: '#fff', padding: '0.25rem 0.75rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }} 
            onClick={() => onDelete(row.id)}
          >
            Delete
          </button>
        </div>
      )
    }
  ];
  return <DataTable columns={columns} data={genres} />;
}
