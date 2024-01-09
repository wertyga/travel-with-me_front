import * as React from 'react';
import { View } from 'react-native';
import { useAuthGuard } from '@/hooks';
import { useGetPlaceQuery } from '@/api';
import { MainLayout } from '@/Layouts';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { SafeLoader } from '@/components/SafeLoader';
import { PointMeta } from '@/components/Point/PointMeta/PointMeta';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import PlaceDefaultImage from '@/assets/images/guide_placeholder.png';

const PlaceScreen = ({ route }) => {
  const navi = useNavigation();
  useAuthGuard();
  const { params: { placeSlug } = {} } = route;

  const { data: { place } = {}, isFetching } = useGetPlaceQuery(
    { slug: placeSlug },
    { skip: !placeSlug }
  );

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  if (!place || isFetching) {
    return <SafeLoader />;
  }

  return (
    <MainLayout
      bgImage={place.images[0] || PlaceDefaultImage}
      headerTitle={place.title}
    >
      <PointMeta point={place} />
    </MainLayout>
  );
};

export default PlaceScreen;
