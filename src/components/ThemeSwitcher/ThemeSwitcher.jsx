import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ThemeSwitcher.scss';

const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
    } catch {
      // storage unavailable (private mode, blocked cookies)
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // local storage
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // storage unavailable (private mode, blocked cookies)
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? t('a11y.switch_to_dark') : t('a11y.switch_to_light')}
    >
      <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
    </button>
  );
};

export default ThemeSwitcher;