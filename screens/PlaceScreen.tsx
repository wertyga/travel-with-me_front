import * as React from 'react';
import { useAuthGuard } from '@/hooks';
import { useGetPlaceQuery } from '@/api';
import { MainLayout } from '@/Layouts';
import { SafeLoader } from '@/components/SafeLoader';
import { PointMeta } from '@/components/Point/PointMeta/PointMeta';
import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import PlaceDefaultImage from '@/assets/images/guide_placeholder.png';
import { PointImagesCarousel } from '@/components/Guide/GuideMap/PointImagesCarousel';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

const PlaceScreen = ({ route }) => {
  const navi = useNavigation();
  useAuthGuard();
  const { params: { placeSlug, autoplay } = {} } = route;
  const [state, setState] = useState({
    isShowGallery: false,
  });

  const { data: { place } = {}, isFetching } = useGetPlaceQuery(
    { slug: placeSlug },
    { skip: !placeSlug }
  );

  const onToggleShowGallery = () => {
    setState(prev => ({ ...prev, isShowGallery: !prev.isShowGallery }));
  };

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  if (!place || isFetching) {
    return <SafeLoader />;
  }

  const isShowGalley = state.isShowGallery && !!place.images.length;
  return (
    <MainLayout
      bgImage={place.images[0] ? { uri: place.images[0] } : PlaceDefaultImage}
      headerTitle={place.title}
    >
      <TouchableOpacity style={styles.galleryBtn} onPress={onToggleShowGallery}>
        <Ionicons name="images-outline" size={30} color="white" />
      </TouchableOpacity>
      <PointMeta point={place} autoplay={autoplay} />

      {isShowGalley && (
        <PointImagesCarousel point={place} onClose={onToggleShowGallery} />
      )}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  galleryBtn: {
    position: 'absolute',
    right: 10,
    bottom: 310,
  },
});

export default PlaceScreen;
