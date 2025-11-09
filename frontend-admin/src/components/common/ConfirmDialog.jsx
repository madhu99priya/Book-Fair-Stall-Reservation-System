import React from 'react';
import Modal from './Modal.jsx';

export default function ConfirmDialog({ open, title = 'Confirm', message, onConfirm, onCancel }) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      actions={
        <>
          <button onClick={onCancel}>Cancel</button>
          <button style={{ background: '#2563eb', color: '#fff' }} onClick={onConfirm}>
            Confirm
          </button>
        </>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}