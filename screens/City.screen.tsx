import React from 'react';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';
import { useGetCitiesLightListQuery, useGetCityQuery } from '@/api';
import { CityScreenMeta } from '@/components/City/CityScreenMeta/CityScreenMeta';
import { SafeLoader } from '@/components/SafeLoader';
import { ScreenContentWrapper } from '@/components/Screen';
import { useNavigation } from '@/hooks';
import { City } from '@/types';

const CityScreen = ({ route: { params } }: any) => {
  const navi = useNavigation();
  const router = useRoute();

  const currentCity = (router.params as any)?.city;
  const { data: { cities = [] } = {} } = useGetCitiesLightListQuery();
  const {
    data: { city } = {},
    isFetching: cityLoading,
    error: getCityError,
    refetch: refetchCity,
  } = useGetCityQuery({ slug: currentCity?.slug });

  const onChangeCity = async ({
    index,
    item,
  }: {
    item: City;
    index: number;
  }) => {
    if (!cities[index]) return;

    navi.setParams({ cityTab: null, city: item } as any);
  };

  if (!city || !cities.length) {
    return (
      <SafeLoader
        image={currentCity?.image}
        textColor="white"
        indicatorColor="white"
      />
    );
  }

  const initialCityIndex = cities.findIndex(
    ({ _id }) => _id === params?.city._id
  );

  return (
    <MainLayout
      style={[styles.container, cityLoading && { paddingBottom: 0 }]}
      headerTitle={currentCity?.title}
      isLoading={cityLoading}
      loaderTextColor="white"
      fetchError={getCityError}
      reFetchMethod={refetchCity}
      withHeaderShadow
    >
      <ScreenContentWrapper<City>
        data={cities}
        defaultIndex={initialCityIndex}
        onChange={onChangeCity}
        imageKey="image"
        noDots
        isFullScreen
      >
        {!cityLoading && <CityScreenMeta city={city} />}
      </ScreenContentWrapper>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
});

export default CityScreen;
