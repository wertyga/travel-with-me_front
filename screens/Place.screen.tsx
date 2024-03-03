import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthGuard } from '@/hooks';
import { useGetPlaceQuery } from '@/api';
import { MainLayout } from '@/Layouts';
import { SafeLoader } from '@/components/SafeLoader';
import { PointMeta } from '@/components/Point/PointMeta/PointMeta';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import PlaceDefaultImage from '@/assets/images/guide_placeholder.png';
import { PointImagesCarousel } from '@/components/Guide/GuideMap/PointImagesCarousel';
import { updateDomAction } from '@/stores';
import { Ionicons } from '@expo/vector-icons';

const PlaceScreen = ({ route }) => {
  const navi = useNavigation();
  useAuthGuard();
  const { params: { placeSlug, autoplay } = {} } = route;
  const [state, setState] = useState({
    isShowGallery: false,
  });

  const {
    data: { place } = {},
    isFetching,
    isLoading,
  } = useGetPlaceQuery({ slug: placeSlug }, { skip: !placeSlug });

  const onToggleShowGallery = () => {
    if (!place?.images?.length) {
      setState(prev => ({ ...prev, isShowGallery: false }));
      return;
    }

    setState(prev => ({ ...prev, isShowGallery: !prev.isShowGallery }));
  };

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if (state.isShowGallery) {
      updateDomAction({
        footer: { display: 'none' },
        header: { display: 'none' },
      });
    } else {
      updateDomAction({
        footer: { display: 'flex' },
        header: { display: 'flex' },
      });
    }
  }, [state.isShowGallery]);

  if (!place || isLoading) {
    return <SafeLoader />;
  }

  const isShowGalley = state.isShowGallery && !!place.images.length;
  return (
    <MainLayout
      bgImage={place.images[0] ? { uri: place.images[0] } : PlaceDefaultImage}
      headerTitle={place.title}
    >
      <PointMeta
        point={place}
        autoplay={autoplay}
        isFetching={isFetching}
        toggleGallery={onToggleShowGallery}
      />

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
