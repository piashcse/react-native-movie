import React, { useEffect, useState } from 'react';
import { NetInfoState, useNetInfo } from '@react-native-community/netinfo';
import { Snackbar } from 'react-native-paper';

const CheckInternetConnection = () => {
  const internetState: NetInfoState = useNetInfo();
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    if (!internetState.isConnected) setVisible(!internetState.isConnected);
  }, [internetState.isConnected]);

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: 'Dismiss',
        onPress: () => {
          onDismissSnackBar();
        },
      }}
    >
      Network connection is unavailable.
    </Snackbar>
  );
};
export default CheckInternetConnection;
