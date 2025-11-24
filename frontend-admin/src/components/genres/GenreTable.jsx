import React, { useState } from 'react';
import DataTable from '../common/DataTable.jsx';

export default function GenreTable({ genres, onDelete, onEdit, onViewUsers }) {

  const [hoverStates, setHoverStates] = useState({});

  const handleHover = (id, type, value) => {
    setHoverStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: value
      }
    }));
  };

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => {
        const hover = hoverStates[row.id] || {};

        return (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              style={{
                background: hover.edit ? "#000000ff" : "#210da4ff",
                color: "#fff",
                padding: "0.25rem 0.75rem",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                width: "20%",
                transition: "background 0.2s"
              }}
              onMouseEnter={() => handleHover(row.id, 'edit', true)}
              onMouseLeave={() => handleHover(row.id, 'edit', false)}
              onClick={() => onEdit(row)}
            >
              Edit
            </button>

            <button
              style={{
                background: hover.view ? '#000000ff' : '#4429b4ff',
                color: '#fff',
                padding: '0.25rem 0.75rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '20%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={() => handleHover(row.id, 'view', true)}
              onMouseLeave={() => handleHover(row.id, 'view', false)}
              onClick={() => onViewUsers(row)}
            >
              View Users
            </button>

            <button
              style={{
                background: hover.delete ? '#dc2626' : '#ef4444',
                color: '#fff',
                padding: '0.25rem 0.75rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '20%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={() => handleHover(row.id, 'delete', true)}
              onMouseLeave={() => handleHover(row.id, 'delete', false)}
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
