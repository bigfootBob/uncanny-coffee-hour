import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ThemeSwitcher.scss';

// Only written when the visitor clicks the toggle. The old 'theme' key was
// saved on every visit, so it can't tell a real choice from the old dark default.
const STORAGE_KEY = 'theme-choice';

const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme) return savedTheme;
    } catch {
      // storage unavailable (private mode, blocked cookies)
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable (private mode, blocked cookies)
    }
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