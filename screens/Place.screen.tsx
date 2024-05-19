import * as React from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainLayout } from '@/Layouts';
import { useGetPlaceQuery } from '@/api';
import { CarouselNew } from '@/components/CarouselNew/CarouselNew';
import { PointMeta } from '@/components/Point/PointMeta/PointMeta';
import { SafeLoader } from '@/components/SafeLoader';
import { useAuthGuard } from '@/hooks';
import { updateDomAction, useSelector } from '@/stores';

const PlaceScreen = ({ route }) => {
  useAuthGuard();

  const navi = useNavigation();
  const layoutHeight = useSelector(
    ({ domStore }) => domStore?.layout?.height || 0
  );

  const { params: { placeSlug } = {} } = route;
  const [state, setState] = useState({
    isShowGallery: false,
    isMetaOpened: false,
    currentIndex: 0,
  });

  const {
    data: { place } = {},
    isFetching,
    isLoading,
  } = useGetPlaceQuery({ slug: placeSlug }, { skip: !placeSlug });

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

  const { width: windowWidth } = Dimensions.get('window');

  return (
    <MainLayout
      style={{
        paddingHorizontal: 0,
        paddingTop: 0,
      }}
      headerTitle={place.title}
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

export default PlaceScreen;
