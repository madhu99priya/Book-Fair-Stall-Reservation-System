import React from 'react';
import './DataTable.css';

export default function DataTable({ columns, data, keyField = 'id', onRowClick }) {
  return (
    <table className="dt-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.length ? (
          data.map((row) => (
            <tr
              key={row[keyField]}
              onClick={() => onRowClick && onRowClick(row)}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="dt-empty">
              No records
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}