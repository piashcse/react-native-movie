import i18n from 'i18next';
import * as RNLocalize from 'react-native-localize';
import en from './locale-json/en.json';
import bn from './locale-json/bn.json';

// Define the type for supported languages
export type TranslationKeys = keyof typeof en;

const getDeviceLanguage = (): string => {
  const locales = RNLocalize.getLocales();
  return locales[0]?.languageTag || 'en';
};

// Initialize i18next
i18n.init({
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
