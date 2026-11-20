import React from 'react';
import { Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useApiErrorStore } from '../../store/zustand/apiErrorStore.ts';

const ApiErrorSnackbar = () => {
  const { t } = useTranslation();
  const visible = useApiErrorStore((state) => state.visible);
  const message = useApiErrorStore((state) => state.message);
  const hideError = useApiErrorStore((state) => state.hideError);

  return (
    <Snackbar
      visible={visible}
      onDismiss={hideError}
      duration={4000}
      action={{ label: t('common.dismiss'), onPress: hideError }}
    >
      {message}
    </Snackbar>
  );
};

export default ApiErrorSnackbar;
