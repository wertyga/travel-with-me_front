import * as React from 'react';

import { StyleSheet } from 'react-native';

import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { useStores, useSubscription } from '@/hooks';

import { City } from '@/types';

type Props = {
  city: City;
};

const BTN_SIZE = 40;

const CityDownloader = ({ city }: Props) => {
  const { isSubscriptionValid } = useSubscription();

  const {
    saveCityToOffline,
    isOfflineStoreLoading,
    offlineCities,
    isNetConnected,
  } = useStores(stores => ({
    saveCityToOffline: stores.offlineStore.saveCity,
    isOfflineStoreLoading: stores.offlineStore.isLoading,
    offlineCities: stores.offlineStore.cities,
    isNetConnected: stores.appStateStore.isNetConnected,
  }));

  const isCityDownloaded = !!offlineCities.find(c => c._id === city._id);
  const isRenderDownloadBtn = isSubscriptionValid && isNetConnected;

  if (!isRenderDownloadBtn) {
    return null;
  }

  return (
    <Button
      rectangle
      noPaddings={!isCityDownloaded}
      squareSize={!isCityDownloaded && BTN_SIZE}
      disabled={isOfflineStoreLoading}
      onPress={() => saveCityToOffline(city.slug)}
      style={styles.action}
    >
      <FontAwesome5 name="cloud-download-alt" size={24} color="white" />
      {isCityDownloaded && <Ionicons name="reload" size={24} color="white" />}
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
