import { useCallback } from 'react';
import { Alert } from 'react-native';

interface UseAlertReturn {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showConfirmation: (title: string, message: string) => Promise<boolean>;
}

export const useAlert = (): UseAlertReturn => {
  const showError = useCallback((message: string) => {
    Alert.alert('Error', message);
  }, []);

  const showSuccess = useCallback((message: string) => {
    Alert.alert('Success', message);
  }, []);

  const showConfirmation = useCallback(
    (title: string, message: string): Promise<boolean> => {
      return new Promise(resolve => {
        Alert.alert(title, message, [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => resolve(false),
          },
          {
            text: 'OK',
            onPress: () => resolve(true),
          },
        ]);
      });
    },
    [],
  );

  return { showError, showSuccess, showConfirmation };
};