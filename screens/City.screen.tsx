import React, { useEffect, useRef, useState } from 'react';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@/hooks';
import { SafeLoader } from '@/components/SafeLoader';
import { FastImage } from '@/components/Image';
import { useGetCityQuery, useGetCitiesLightListQuery } from '@/api';
import { navigateToError } from '@/utils';
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';
import { useHandleFromError } from '@/hooks';
import { CityScreenMeta } from '@/components/City/CityScreenMeta/CityScreenMeta';
import { City } from '@/types';
import { CarouselNew } from '@/components/CarouselNew/CarouselNew';
import { useSelector } from '@/stores';
import { CitiesCarouselImage } from '@/components/City/CitiesCarouselImage/CitiesCarouselImage';

const CityScreen = ({ route: { params } }) => {
  const navi = useNavigation();
  const slider = useRef();
  const layoutHeight = useSelector(({ domStore }) => domStore?.layout?.height);
  const [defaultCity, setDefaultCity] = useState<City>(params?.city);

  const {
    data: { cities = [] } = {},
    error: getLightListError,
    isFetching,
    refetch: refetchCities,
  } = useGetCitiesLightListQuery();
  const {
    data: { city } = {},
    isFetching: cityLoading,
    error: getCityError,
  } = useGetCityQuery({ slug: defaultCity.slug });

  useEffect(() => {
    if (!getLightListError && !getCityError) return;

    navigateToError(navi, getLightListError || getCityError);
  }, [getLightListError, getCityError]);

  useHandleFromError(refetchCities, isFetching);

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
    >
      <View style={[styles.layout, { height: layoutHeight }]}>
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
        />
      </View>

      {!cityLoading && <CityScreenMeta city={city} />}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    ...StyleSheet.absoluteFillObject,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
  },
  cityImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export default CityScreen;
