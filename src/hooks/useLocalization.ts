import { useMemo } from 'react';
import { i18nLocale } from '../localization/i18nLocale.ts';
import { AppString } from '../localization/appString.ts';

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
