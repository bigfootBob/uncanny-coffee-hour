import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import klingonLogo from '../../assets/images/klingon-logo.png';
import './LanguageSwitcher.scss';

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ga', label: 'Gaeilge' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
  { code: 'ru', label: 'Русский' },
  { code: 'sv', label: 'Svenska' },
  { code: 'sjn', label: 'Edhellen' },
  { code: 'tlh', label: 'tlhIngan Hol' }
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showQapla, setShowQapla] = useState(false); 
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);

    if (code === 'tlh') {
      setShowQapla(true);
      setTimeout(() => setShowQapla(false), 3000);
    }
  };

  return (
    <>
    <div className="language-switcher" ref={wrapperRef}>
      <button 
        className={`globe-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <GlobeIcon />
      </button>

      <div className={`lang-dropdown ${isOpen ? 'open' : ''}`}>
        <ul>
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                className={i18n.resolvedLanguage === lang.code ? 'current' : ''}
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
      {/* Easter Egg */}
      {showQapla && createPortal(
        <div className="qapla-overlay">
          <div className="klingon-insignia">
            <img src={klingonLogo} alt="Klingon Empire" />
          </div>
          <span className="qapla-text">Qapla'</span>
        </div>,
        document.body
      )}
    </>
  );
};

export default LanguageSwitcher;