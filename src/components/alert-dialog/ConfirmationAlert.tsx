import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

type ConfirmationDialogProps = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationDialog = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>Cancel</Button>
          <Button onPress={onConfirm}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmationDialog;
