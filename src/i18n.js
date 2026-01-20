import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import de from './locales/de/translation.json';
import en from './locales/en/translation.json';
import ga from './locales/ga/translation.json';
import it from './locales/it/translation.json';
import ja from './locales/ja/translation.json';
import ru from './locales/ru/translation.json';
import sjn from './locales/sjn/translation.json'; // Elvish (Sindarin)
import sv from './locales/sv/translation.json';
import tlh from './locales/tlh/translation.json'; // Klingon

i18n
  // Detects user language (e.g., from browser settings)
  .use(LanguageDetector)
  // Passes i18n down to React
  .use(initReactI18next)
  .init({
    resources: {
        de: { translation: de },
        en: { translation: en },
        ga: { translation: ga },
        it: { translation: it },
        ja: { translation: ja },
        ru: { translation: ru },
        sjn: { translation: sjn },
        sv: { translation: sv },
        tlh: { translation: tlh }
    },
    fallbackLng: 'en', // Default
    interpolation: {
      escapeValue: false // React handles XSS safety
    }
  });

export default i18n;