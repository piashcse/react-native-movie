import { useMemo } from 'react';
import { i18nLocale } from '../locale/i18nLocale.ts';

export const useLocalization = (obj: Record<string, string>) => {
  return useMemo(() => {
    const localizedObj: Record<string, string> = {};
    Object.keys(obj).forEach((key) => {
      localizedObj[key] = i18nLocale.t(obj[key]);
    });
    return localizedObj;
  }, [obj]);
};
