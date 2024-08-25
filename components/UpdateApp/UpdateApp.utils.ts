import { Linking, Platform } from 'react-native';

import Constants from 'expo-constants';

import { AppStateStore } from '@/mobx/stores';

import { storage } from '@/utils';

export const STORAGE_KEY_OF_UPDATE = 'isNoNeedToUpdateForVersion';

export const handleUpdateApp = () => {
  const link =
    Platform.OS === 'ios'
      ? Constants.expoConfig?.extra?.APP_MARKET_URL
      : Constants.expoConfig?.extra?.PLAY_STORE_URL;

  storage.delete(STORAGE_KEY_OF_UPDATE);
  Linking.openURL(link);
};

export const getIsUserRefusedOfUpdate = async () => {
  const storageVersion = await storage.get(STORAGE_KEY_OF_UPDATE);

  return (
    !!AppStateStore.ENV.runtimeVersion &&
    !!storageVersion &&
    AppStateStore.ENV.runtimeVersion === storageVersion
  );
};

export const setIsUserRefusedOfUpdate = () => {
  storage.set(STORAGE_KEY_OF_UPDATE, AppStateStore.ENV.runtimeVersion);
};
