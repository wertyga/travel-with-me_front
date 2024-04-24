import * as React from 'react';
import { View } from 'react-native';
import { useGetFavoritesQuery } from '@/api';
import { MainLayout } from '@/Layouts';
import { FavoritesList } from '@/components/User';
import { CText } from '@/components/CText';
import { StyleSheet } from 'react-native';
import { useAuthGuard } from '@/hooks';

const FavoritesScreen = () => {
  const user = useAuthGuard();
  console.log({ user });
  const {
    data: { guides, places } = {},
    isFetching,
    error,
  } = useGetFavoritesQuery(undefined, { skip: !user });
  console.log({ guides, places, error });
  const isRenderList = !!guides || !!places;
  const isEmptyList = isRenderList && !guides.length && !places.length;

  return (
    <MainLayout
      headerTitle="Favorites"
      style={styles.container}
      isLoading={isFetching}
    >
      {isRenderList && !isEmptyList && (
        <FavoritesList guides={guides} places={places} />
      )}
      {isEmptyList && (
        <View style={styles.emptyText}>
          <CText style={{ textAlign: 'center', fontSize: 14 }}>
            This page is empty for now, but as soon as you select the guide or
            place you like, it will be displayed here
          </CText>
        </View>
      )}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 35,
  },
  emptyText: {
    height: '100%',
    paddingTop: 100,
  },
});

export default FavoritesScreen;
