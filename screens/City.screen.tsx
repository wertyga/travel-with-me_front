import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SafeLoader } from '@/components/SafeLoader';
import { useGetCityQuery, useGetCitiesLightListQuery } from '@/api';
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';
import { CityScreenMeta } from '@/components/City/CityScreenMeta/CityScreenMeta';
import { City } from '@/types';
import { CarouselNew } from '@/components/CarouselNew/CarouselNew';
import { useSelector } from '@/stores';
import { CitiesCarouselImage } from '@/components/City/CitiesCarouselImage/CitiesCarouselImage';

const CityScreen = ({ route: { params } }) => {
  const slider = useRef();
  const layoutHeight = useSelector(({ domStore }) => domStore?.layout?.height);
  const [defaultCity, setDefaultCity] = useState<City>(params?.city);

  const { data: { cities = [] } = {} } = useGetCitiesLightListQuery();
  const {
    data: { city } = {},
    isFetching: cityLoading,
    error: getCityError,
    refetch: refetchCity,
  } = useGetCityQuery({ slug: defaultCity.slug });

  const onChangeCity = async ({
    index,
    item,
  }: {
    item: City;
    index: number;
  }) => {
    if (!cities[index]) return;

    setDefaultCity(item);
  };

  if (!city || !cities.length) {
    return (
      <SafeLoader
        image={defaultCity.image}
        textColor="white"
        indicatorColor="white"
      />
    );
  }

  const initialCityIndex = cities.findIndex(
    ({ _id }) => _id === params?.city._id
  );
  const currentIndex = cities.findIndex(({ _id }) => _id === defaultCity._id);

  return (
    <MainLayout
      style={{ paddingHorizontal: 0 }}
      headerTitle={defaultCity.title}
      isLoading={cityLoading}
      loaderTextColor="white"
      fetchError={getCityError}
      reFetchMethod={refetchCity}
    >
      <CarouselNew<City>
        data={cities}
        defaultIndex={initialCityIndex}
        sliderRef={slider}
        onChange={onChangeCity}
        renderItem={({ item, index }) => {
          return (
            <CitiesCarouselImage
              item={item}
              key={item._id}
              isActive={index === currentIndex}
            />
          );
        }}
        noDots
        isFullScreen
      />

      {!cityLoading && <CityScreenMeta city={city} />}
    </MainLayout>
  );
};

export default CityScreen;
