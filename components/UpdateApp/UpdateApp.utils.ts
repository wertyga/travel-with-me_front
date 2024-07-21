import { Linking, Platform } from 'react-native';

import Constants from 'expo-constants';

import { storage } from '@/utils';

export const STORAGE_KEY = 'isNoNeedToUpdate';

export const handleUpdateApp = () => {
  const link =
    Platform.OS === 'ios'
      ? Constants.expoConfig?.extra?.APP_MARKET_URL
      : Constants.expoConfig?.extra?.PLAY_STORE_URL;

  storage.delete(STORAGE_KEY);
  Linking.openURL(link);
};
