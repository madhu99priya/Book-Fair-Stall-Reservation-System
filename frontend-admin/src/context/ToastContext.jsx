import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ message, type, onClose }) {
  const colors = {
    success: { bg: '#dcfce7', border: '#22c55e', text: '#166534' },
    error: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
    warning: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
    info: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' }
  };

  const style = colors[type] || colors.info;

  return (
    <div
      style={{
        background: style.bg,
        border: `2px solid ${style.border}`,
        color: style.text,
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        minWidth: '300px',
        maxWidth: '400px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: style.text,
          cursor: 'pointer',
          fontSize: '1.25rem',
          padding: '0 0.25rem',
          marginLeft: '1rem'
        }}
      >
        ×
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
