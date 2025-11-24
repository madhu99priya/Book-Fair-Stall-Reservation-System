import React, { useState } from 'react';
import DataTable from '../common/DataTable.jsx';

export default function GenreTable({ genres, onDelete, onEdit, onViewUsers }) {

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => {
        const [hoverEdit, setHoverEdit] = useState(false);
        const [hoverView, setHoverView] = useState(false);
        const [hoverDelete, setHoverDelete] = useState(false);

        return (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              style={{
                background: hoverEdit ? "#000000ff" : "#210da4ff",
                color: "#fff",
                padding: "0.25rem 0.75rem",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                width: "20%",
                transition: "background 0.2s"
              }}
              onMouseEnter={() => setHoverEdit(true)}
              onMouseLeave={() => setHoverEdit(false)}
              onClick={() => onEdit(row)}
            >
              Edit
            </button>

            <button
              style={{
                background: hoverView ? '#000000ff' : '#4429b4ff',
                color: '#fff',
                padding: '0.25rem 0.75rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '20%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={() => setHoverView(true)}
              onMouseLeave={() => setHoverView(false)}
              onClick={() => onViewUsers(row)}
            >
              View Users
            </button>

            <button
              style={{
                background: hoverDelete ? '#dc2626' : '#ef4444',
                color: '#fff',
                padding: '0.25rem 0.75rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '20%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={() => setHoverDelete(true)}
              onMouseLeave={() => setHoverDelete(false)}
              onClick={() => onDelete(row.id)}
            >
              Delete
            </button>
          </div>
        );
      }
    }
  ];

  return <DataTable columns={columns} data={genres} />;
}
