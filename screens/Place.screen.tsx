import * as React from 'react';
import { useEffect, useState } from 'react';

import { Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import { CarouselNew } from '@/components/CarouselNew/CarouselNew';
import { FastImage } from '@/components/FastImage';
import { PointImagesCarousel } from '@/components/Guide/GuideMap/PointImagesCarousel';
import { PointMeta } from '@/components/Point/PointMeta/PointMeta';
import { SafeLoader } from '@/components/SafeLoader';
import { useAuthGuard, useStores } from '@/hooks';

import DefaultPlaceImage from '@/assets/images/default_point_image.png';

const PlaceScreen = ({ route }) => {
  useAuthGuard();

  const { params: { point } = {} as any } = route;

  const [fullImageWidth, setFullImageWidth] = useState(-1);

  const { layoutHeight, getPlace, place, isLoading } = useStores(stores => ({
    layoutHeight: stores.domStore.layoutHeight,
    place: stores.placeStore.place,
    getPlace: stores.placeStore.getPlace,
    isLoading: stores.placeStore.isLoading,
  }));

  const toggleFullWidth = (index: number) => () => {
    setFullImageWidth(fullImageWidth === index ? -1 : index);
  };

  useEffect(() => {
    if (!point) return;

    getPlace({ slug: point.slug });
  }, [point]);

  if (!place || isLoading) {
    return <SafeLoader />;
  }

  const { width: windowWidth } = Dimensions.get('window');
  const images = !!place.images.length ? place.images : [DefaultPlaceImage];
  const imageHeight = layoutHeight - 300;

  return (
    <MainLayout
      style={{
        paddingHorizontal: 0,
        paddingTop: 0,
      }}
      headerTitle={place.title}
      withHeaderShadow
    >
      <ScrollView>
        <CarouselNew<string>
          style={{
            height: imageHeight,
          }}
          dotsStyle={{
            paddingBottom: 12,
          }}
          data={images}
          cardWidth={windowWidth}
          onChange={() => setFullImageWidth(-1)}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={item}
                activeOpacity={1}
                onPress={toggleFullWidth(index)}
              >
                <FastImage
                  source={item}
                  style={{
                    width: windowWidth,
                    height: imageHeight,
                    objectFit: 'cover',
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />

        <PointMeta point={place} />
      </ScrollView>

      {fullImageWidth !== -1 && (
        <PointImagesCarousel
          point={place}
          onClose={() => setFullImageWidth(-1)}
          initialIndex={fullImageWidth}
        />
      )}
    </MainLayout>
  );
};

export default observer(PlaceScreen);
