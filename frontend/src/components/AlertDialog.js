import React from 'react';

const AlertDialog = ({ isOpen, onClose, title, message, type = 'error' }) => {
  if (!isOpen) return null;

  return (
    <div className="alert-dialog-overlay">
      <div className={`alert-dialog-content alert-${type}`}>
        <div className="alert-dialog-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="alert-dialog-body">
          <p>{message}</p>
        </div>
        <div className="alert-dialog-footer">
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
