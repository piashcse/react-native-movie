import { useMemo } from 'react';
import { i18nLocale } from '../locale/i18nLocale.ts';
import { AppString } from '../locale/AppString.ts';

type AppStringKey = keyof typeof AppString; // Keys of APP_STRING

export const useLocalization = () => {
  return useMemo(() => {
    const localizedStrings: Record<AppStringKey, string> = {} as Record<
      AppStringKey,
      string
    >;

    (Object.keys(AppString) as AppStringKey[]).forEach((key) => {
      localizedStrings[key] = i18nLocale.t(AppString[key]);
    });

    return localizedStrings;
  }, []);
};
