import * as React from 'react';
import { View } from 'react-native';
import { useGetFavoritesQuery } from '@/api';
import { MainLayout } from '@/Layouts';
import { FavoritesList } from '@/components/User';
import { CText } from '@/components/CText';
import { Loader } from '@/components/Loader';
import { StyleSheet } from 'react-native';

const FavoritesScreen = () => {
  const { data: { guides, places } = {}, isFetching } = useGetFavoritesQuery();

  const isRenderList = !!guides || !!places;
  const isEmptyList = isRenderList && !guides.length && !places.length;
  console.log({ isRenderList, isEmptyList });
  return (
    <>
      {isFetching && <Loader />}
      <MainLayout headerTitle="Favorites" style={styles.container}>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
  },
  emptyText: {
    height: '100%',
    paddingTop: 100,
  },
});

export default FavoritesScreen;
