import React, { useState } from 'react';
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';
import { useGetCitiesLightListQuery, useGetCityQuery } from '@/api';
import { CarouselNew } from '@/components/CarouselNew/CarouselNew';
import { CitiesCarouselImage } from '@/components/City/CitiesCarouselImage/CitiesCarouselImage';
import { CityScreenMeta } from '@/components/City/CityScreenMeta/CityScreenMeta';
import { SafeLoader } from '@/components/SafeLoader';
import { City } from '@/types';

const CityScreen = ({ route: { params } }: any) => {
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
        onChange={onChangeCity}
        renderItem={({ item, index }) => {
          return <CitiesCarouselImage item={item} key={item._id} />;
        }}
        noDots
        isFullScreen
      />

      {!cityLoading && <CityScreenMeta city={city} />}
    </MainLayout>
  );
};

export default CityScreen;
