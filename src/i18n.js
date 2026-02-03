import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// languages supported
// ----------------------
// en = English
// de = German
// ga = Gaelic
// it = Italian
// ja = Japanese
// ru = Russian
// sjn = Elvish
// sv = Swedish
// tlh = Klingon

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

import enGames from './locales/en/games.json';
import deGames from './locales/de/games.json';
import gaGames from './locales/ga/games.json';
import itGames from './locales/it/games.json';
import jaGames from './locales/ja/games.json';
import ruGames from './locales/ru/games.json';
import sjnGames from './locales/sjn/games.json';
import svGames from './locales/sv/games.json';
import tlhGames from './locales/tlh/games.json';

import enInventory from './locales/en/inventory.json';
import deInventory from './locales/de/inventory.json';
import gaInventory from './locales/ga/inventory.json';
import itInventory from './locales/it/inventory.json';
import jaInventory from './locales/ja/inventory.json';
import ruInventory from './locales/ru/inventory.json';
import sjnInventory from './locales/sjn/inventory.json';
import svInventory from './locales/sv/inventory.json';
import tlhInventory from './locales/tlh/inventory.json';

import enTrivia from './locales/en/trivia.json';
import deTrivia from './locales/de/trivia.json';
import gaTrivia from './locales/ga/trivia.json';
import itTrivia from './locales/it/trivia.json';
import jaTrivia from './locales/ja/trivia.json';
import ruTrivia from './locales/ru/trivia.json';
import sjnTrivia from './locales/sjn/trivia.json';
import svTrivia from './locales/sv/trivia.json';
import tlhTrivia from './locales/tlh/trivia.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
        en: { translation: enTrans, bios: enBios, games: enGames, inventory: enInventory, trivia: enTrivia },
        de: { translation: deTrans, bios: deBios, games: deGames, inventory: deInventory, trivia: deTrivia  },
        ga: { translation: gaTrans, bios: gaBios, games: gaGames, inventory: gaInventory, trivia: gaTrivia  },
        it: { translation: itTrans, bios: itBios, games: itGames, inventory: itInventory, trivia: itTrivia  },
        ja: { translation: jaTrans, bios: jaBios, games: jaGames, inventory: jaInventory, trivia: jaTrivia  },
        ru: { translation: ruTrans, bios: ruBios, games: ruGames, inventory: ruInventory, trivia: ruTrivia  },
        sjn: { translation: sjnTrans, bios: sjnBios, games: sjnGames, inventory: sjnInventory, trivia: sjnTrivia  },
        sv: { translation: svTrans, bios: svBios, games: svGames, inventory: svInventory, trivia: svTrivia  },
        tlh: { translation: tlhTrans, bios: tlhBios, games: tlhGames, inventory: tlhInventory, trivia: tlhTrivia  }
    },
    fallbackLng: 'en',
    debug: true, // Keep this on until verify
    interpolation: {
      escapeValue: false 
    },
    ns: ['translation', 'bios', 'games', 'inventory', 'trivia'],
    defaultNS: 'translation', 
  });

export default i18n;