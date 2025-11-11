import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    if (totalPages <= 7) return pages;
    
    if (currentPage <= 3) {
      return [...pages.slice(0, 5), '...', totalPages];
    }
    
    if (currentPage >= totalPages - 2) {
      return [1, '...', ...pages.slice(totalPages - 5)];
    }
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getPageNumbers();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1.5rem',
      padding: '1rem',
      background: '#fff',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
        Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of <strong>{totalItems}</strong> items
      </div>

      <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            background: currentPage === 1 ? '#f8fafc' : '#fff',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            color: currentPage === 1 ? '#cbd5e1' : '#475569'
          }}
        >
          Previous
        </button>

        {visiblePages.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} style={{ padding: '0.5rem', color: '#94a3b8' }}>
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                background: currentPage === page ? '#3b82f6' : '#fff',
                color: currentPage === page ? '#fff' : '#475569',
                cursor: 'pointer',
                fontWeight: currentPage === page ? '600' : '400',
                minWidth: '40px'
              }}
            >
              {page}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            background: currentPage === totalPages ? '#f8fafc' : '#fff',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            color: currentPage === totalPages ? '#cbd5e1' : '#475569'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
