import * as React from 'react';
import { useEffect, useState } from 'react';

import { Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import { CarouselNew } from '@/components/CarouselNew/CarouselNew';
import { PointMeta } from '@/components/Point/PointMeta/PointMeta';
import { SafeLoader } from '@/components/SafeLoader';
import { useAuthGuard, useStores, useSubscriptionGuard } from '@/hooks';

const PlaceScreen = ({ route }) => {
  useAuthGuard();
  useSubscriptionGuard();

  const { params: { placeSlug } = {} as any } = route;

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
    if (!placeSlug) return;

    getPlace({ slug: placeSlug });
  }, [placeSlug]);

  if (!place || isLoading) {
    return <SafeLoader />;
  }

  const { width: windowWidth } = Dimensions.get('window');

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
            height: layoutHeight - 300,
          }}
          data={place.images}
          cardWidth={windowWidth}
          onChange={() => setFullImageWidth(-1)}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={item}
                activeOpacity={1}
                onPress={toggleFullWidth(index)}
              >
                <Image
                  source={{ uri: item }}
                  style={{
                    width: windowWidth,
                    objectFit: fullImageWidth === index ? 'contain' : 'cover',
                    height: layoutHeight - 300,
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />

        <PointMeta point={place} />
      </ScrollView>
    </MainLayout>
  );
};

export default observer(PlaceScreen);
