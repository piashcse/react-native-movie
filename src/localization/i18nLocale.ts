import i18n from 'i18next';
import en from './locale-json/en.json';
import bn from './locale-json/bn.json';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

export type TranslationKeys = keyof typeof en;

const getDeviceLanguage = (): string => {
  const locales = getLocales();
  return locales[0]?.languageCode || 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    bn: { translation: bn },
  },
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const i18nLocale = i18n;
