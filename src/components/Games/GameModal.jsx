import React, { useEffect } from 'react';
import './GameModal.scss';

const GameModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="game-modal-overlay" onClick={onClose}>
      <div 
        className="game-modal-content glass-panel" 
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        <button className="close-btn" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default GameModal;