import * as React from 'react';

import { View } from 'react-native';
import { StyleSheet } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import { CText } from '@/components/CText';
import { FavoritesList } from '@/components/User';
import { useAuthGuard, useFetch, useFocus, useStores } from '@/hooks';

const FavoritesScreen = () => {
  useAuthGuard();

  const { fetchFavorites, isNetConnected } = useStores(stores => ({
    fetchFavorites: stores.userStore.fetchFavorites,
    isNetConnected: stores.appStateStore.isNetConnected,
  }));

  const [
    getFavorites,
    {
      isLoading,
      data: favorites = {
        guides: [],
        places: [],
      },
    },
  ] = useFetch(fetchFavorites);

  useFocus(() => {
    getFavorites();
  });

  const { guides, places } = favorites;
  const isRenderList = !!guides || !!places;
  const isEmptyList = isRenderList && !guides.length && !places.length;

  return (
    <MainLayout headerTitle="Favorites" isLoading={isLoading} withBackButton>
      {!isEmptyList && isRenderList && (
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
  emptyText: {
    height: '100%',
    paddingTop: 100,
  },
});

export default observer(FavoritesScreen);
