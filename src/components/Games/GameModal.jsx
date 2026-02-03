import React, { useEffect } from 'react';
import './GameModal.scss';

const GameModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      className="game-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
    >
      <div
        className="game-modal-content glass-panel"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <button className="close-btn" onClick={onClose} aria-label="Close Modal">×</button>
        {children}
      </div>
    </div>
  );
};

export default GameModal;