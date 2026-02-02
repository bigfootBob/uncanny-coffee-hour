import React, { useState, useId } from 'react';
import { useTranslation } from 'react-i18next';
import './Transcript.scss';

const Transcript = ({ url, title }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="transcript-container">
      <button
        type="button"
        className="transcript-toggle"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className={`icon ${isOpen ? 'rotate' : ''}`} aria-hidden="true">
          ▼
        </span>
        <span className="label">
          {isOpen ? 'Hide Transcript' : 'Read Transcript'}
          {/* Screen reader only text */}
          <span className="sr-only">
            {t('episode.transcript_a11y', { title: title })}
          </span>
        </span>
      </button>

      <div 
        id={contentId} 
        className={`transcript-content ${isOpen ? 'open' : ''}`}
        hidden={!isOpen}
      >
        <div className="inner-padding">
          <p><em>[Placeholder: In a real app, we would fetch the HTML from {url} here.]</em></p>
          <p><strong>Mitch:</strong> (Sipping tea) I still don't understand how people drink that bean water.</p>
          <p><strong>Odd Bob:</strong> It's the nectar of the gods, Mitch! Anyway, welcome to the Uncanny Coffee Hour...</p>
          <p><strong>Saoirse:</strong> <em>*Eerie wind noises*</em></p>
        </div>
      </div>
    </div>
  );
};

export default Transcript;