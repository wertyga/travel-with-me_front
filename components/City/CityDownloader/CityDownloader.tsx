import * as React from 'react';

import { ActivityIndicator, StyleSheet } from 'react-native';

import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { useStores } from '@/hooks';

import { City } from '@/types';

type Props = {
  city: City;
};

const BTN_SIZE = 40;

const CityDownloader = ({ city }: Props) => {
  const {
    saveCityToOffline,
    isOfflineStoreLoading,
    cachedCitiesIds,
    isNetConnected,
  } = useStores(stores => ({
    saveCityToOffline: stores.offlineStore.saveCity,
    isOfflineStoreLoading: stores.offlineStore.isLoading,
    cachedCitiesIds: stores.offlineStore.cachedCitiesIds,
    isNetConnected: stores.appStateStore.isNetConnected,
  }));

  const isCityDownloaded = cachedCitiesIds.includes(city._id);

  if (!isNetConnected) {
    return null;
  }

  const isShowCircle = isOfflineStoreLoading || isCityDownloaded;

  return (
    <Button
      rectangle
      noPaddings={!isShowCircle}
      squareSize={!isShowCircle && BTN_SIZE}
      disabled={isOfflineStoreLoading}
      onPress={() => saveCityToOffline(city.slug)}
      style={styles.action}
    >
      <FontAwesome5 name="cloud-download-alt" size={24} color="white" />
      {isOfflineStoreLoading && <ActivityIndicator />}
      {isCityDownloaded && !isOfflineStoreLoading && (
        <Ionicons name="reload" size={20} color="white" />
      )}
    </Button>
  );
};

export default observer(CityDownloader);

const styles = StyleSheet.create({
  action: {
    height: BTN_SIZE,
    gap: 5,
  },
});
