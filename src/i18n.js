import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTrans from './locales/en/translation.json';
import deTrans from './locales/de/translation.json';
import gaTrans from './locales/ga/translation.json';
import itTrans from './locales/it/translation.json';
import jaTrans from './locales/ja/translation.json';
import ruTrans from './locales/ru/translation.json';
import sjnTrans from './locales/sjn/translation.json';
import svTrans from './locales/sv/translation.json';
import tlhTrans from './locales/tlh/translation.json';

import enBios from './locales/en/bios.json';
import deBios from './locales/de/bios.json';
import gaBios from './locales/ga/bios.json';
import itBios from './locales/it/bios.json';
import jaBios from './locales/ja/bios.json';
import ruBios from './locales/ru/bios.json';
import sjnBios from './locales/sjn/bios.json';
import svBios from './locales/sv/bios.json';
import tlhBios from './locales/tlh/bios.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
        en: { translation: enTrans, bios: enBios },
        de: { translation: deTrans, bios: deBios },
        ga: { translation: gaTrans, bios: gaBios },
        it: { translation: itTrans, bios: itBios },
        ja: { translation: jaTrans, bios: jaBios },
        ru: { translation: ruTrans, bios: ruBios },
        sjn: { translation: sjnTrans, bios: sjnBios },
        sv: { translation: svTrans, bios: svBios },
        tlh: { translation: tlhTrans, bios: tlhBios }
    },
    fallbackLng: 'en',
    debug: true, // Keep this on until verify
    interpolation: {
      escapeValue: false 
    },
    ns: ['translation', 'bios'],
    defaultNS: 'translation', 
  });

export default i18n;