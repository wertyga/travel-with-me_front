import { useCallback, useState } from 'react';
import { AppState } from 'react-native';
import {
  LocationPermissionResponse,
  getForegroundPermissionsAsync,
} from 'expo-location';
import { useFocus } from '@/hooks/useFocus';

export const useForegroundPermissions = () => {
  const [state, setState] = useState<LocationPermissionResponse>(
    {} as LocationPermissionResponse
  );

  const getPermission = useCallback(async () => {
    const data = await getForegroundPermissionsAsync();

    setState(data);
  }, []);

  const stateListener = useCallback(async state => {
    if (state === 'active') {
      getPermission();
    }
  }, []);

  useFocus(() => {
    getPermission();

    const subscription = AppState.addEventListener('change', stateListener);

    return () => {
      subscription.remove();
    };
  }, []);

  return state;
};
