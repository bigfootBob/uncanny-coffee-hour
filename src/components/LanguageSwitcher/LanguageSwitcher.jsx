import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.scss';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },       // German
  { code: 'ga', label: 'Gaeilge' },       // Irish
  { code: 'it', label: 'Italiano' },      // Italian
  { code: 'ja', label: '日本語' },         // Japanese
  { code: 'ru', label: 'Русский' },       // Russian
  { code: 'sv', label: 'Svenska' },       // Swedish
  { code: 'sjn', label: 'Edhellen' },     // Sindarin (Elvish)
  { code: 'tlh', label: 'tlhIngan Hol' }  // Klingon
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="language-switcher">

      <select
        id="lang-select"
        value={i18n.resolvedLanguage}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="language-select"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;