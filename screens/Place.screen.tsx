import * as React from 'react';
import { useEffect } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import { MainLayout } from '@/Layouts';
import { CarouselNew } from '@/components/CarouselNew/CarouselNew';
import { PointMeta } from '@/components/Point/PointMeta/PointMeta';
import { SafeLoader } from '@/components/SafeLoader';
import { useAuthGuard } from '@/hooks';
import { useStores } from '@/hooks';
import { observer } from 'mobx-react';

const PlaceScreen = ({ route }) => {
  useAuthGuard();

  const { params: { placeSlug } = {} as any } = route;

  const { layoutHeight, getPlace, place, isLoading } = useStores(stores => ({
    layoutHeight: stores.domStore.layoutHeight,
    place: stores.placeStore.place,
    getPlace: stores.placeStore.getPlace,
    isLoading: stores.placeStore.isLoading,
  }));

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
          renderItem={({ item, index }) => {
            return (
              <Image
                key={item}
                source={{ uri: item }}
                style={{
                  width: windowWidth,
                  objectFit: 'cover',
                  height: layoutHeight - 300,
                }}
              />
            );
          }}
        />

        <PointMeta point={place} />
      </ScrollView>
    </MainLayout>
  );
};

export default observer(PlaceScreen);
