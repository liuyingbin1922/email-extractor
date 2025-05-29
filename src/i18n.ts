import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';
import es from './locales/es.json';
import de from './locales/de.json';
import pt from './locales/pt.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      'zh-CN': { translation: zhCN },
      'zh-TW': { translation: zhTW },
      es: { translation: es },
      de: { translation: de },
      pt: { translation: pt },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ['en', 'zh-CN', 'zh-TW', 'es', 'de', 'pt'],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n; 