import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationPT from './locales/pt/translation.json';

const resources = {
  en: { translation: translationEN },
  pt: { translation: translationPT }
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', // idioma padrão
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// exporta tanto default quanto named export para compatibilidade ESM/CJS
export const i18n = i18next;
export default i18next;
