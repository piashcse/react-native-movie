import React, { useEffect, useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const CheckInternetConnection = () => {
  const { t } = useTranslation();
  const internetState = useNetInfo();
  const isOffline = internetState.isConnected === false;
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!isOffline) {
      setDismissed(false);
    }
  }, [isOffline]);

  return (
    <Snackbar
      visible={isOffline && !dismissed}
      onDismiss={() => setDismissed(true)}
      duration={7000}
      action={{
        label: t('common.dismiss'),
        onPress: () => setDismissed(true),
      }}
    >
      {t('common.networkUnavailable')}
    </Snackbar>
  );
};

export default CheckInternetConnection;
