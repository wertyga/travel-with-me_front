import * as React from 'react';

import { View } from 'react-native';
import { StyleSheet } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import { CText } from '@/components/CText';
import { FavoritesList } from '@/components/User';
import { useAuthGuard, useFocus, useStores } from '@/hooks';

const FavoritesScreen = () => {
  useAuthGuard();

  const { getFavorites, favorites, isLoading, isNetConnected } = useStores(
    stores => ({
      getFavorites: stores.userStore.getFavorites,
      favorites: stores.userStore.favorites,
      isLoading: stores.userStore.isLoading,
      isNetConnected: stores.appStateStore.isNetConnected,
    })
  );

  useFocus(() => {
    getFavorites();
  });

  const { guides, places } = favorites;
  const isRenderList = !!guides || !!places;
  const isEmptyList = isRenderList && !guides.length && !places.length;

  return (
    <MainLayout
      headerTitle="Favorites"
      style={styles.container}
      isLoading={isLoading}
      withBackButton
    >
      {isRenderList && !isEmptyList && (
        <FavoritesList
          guides={guides}
          places={places}
          isRemoveDisabled={!isNetConnected}
        />
      )}
      {isEmptyList && (
        <View style={styles.emptyText}>
          <CText style={{ textAlign: 'center', fontSize: 14 }} light>
            This page is empty for now, but as soon as you select the guide or
            place you like, it will be displayed here
          </CText>
        </View>
      )}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
  emptyText: {
    height: '100%',
    paddingTop: 100,
  },
});

export default observer(FavoritesScreen);
