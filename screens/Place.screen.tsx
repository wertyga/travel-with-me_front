import * as React from 'react';
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

const PlaceScreen = ({ route }) => {
  const navi = useNavigation();
  useAuthGuard();
  const { params: { placeSlug, autoplay } = {} } = route;
  const [state, setState] = useState({
    isShowGallery: false,
    isMetaOpened: false,
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

  const onOpenStateChange = (state: boolean) => {
    setState(prev => ({ ...prev, isMetaOpened: state }));
  };

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if (state.isShowGallery) {
      updateDomAction({
        footer: { hidden: true },
        header: { hidden: true },
      });
    } else if (!state.isMetaOpened) {
      updateDomAction({
        footer: { hidden: false },
        header: { hidden: false },
      });
    } else {
      updateDomAction({
        header: { hidden: false },
      });
    }
  }, [state.isShowGallery]);

  if (!place || isLoading) {
    return <SafeLoader />;
  }

  const isShowGalley = state.isShowGallery && !!place.images.length;
  return (
    <MainLayout
      bgImage={place.images[0] || PlaceDefaultImage}
      headerTitle={place.title}
      onBgPress={onToggleShowGallery}
    >
      <PointMeta
        point={place}
        autoplay={autoplay}
        isFetching={isFetching}
        toggleGallery={onToggleShowGallery}
        onOpenStateChange={onOpenStateChange}
      />

      {isShowGalley && (
        <PointImagesCarousel point={place} onClose={onToggleShowGallery} />
      )}
    </MainLayout>
  );
};

export default PlaceScreen;
