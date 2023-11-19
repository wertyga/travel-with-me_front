import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect } from 'react';
import { SafeLoader } from '@/components/SafeLoader';
import { Loader } from '@/components/Loader';
import { useGetCityQuery, useGetCitiesLightListQuery } from '@/api';
import { navigateToError } from '@/utils';
import { CityFullInfo } from '@/components/City';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
import { Carousel } from '@/components/Carousel';
import { SearchTotal } from '@/components/SearchTotal';
import * as React from 'react';

const Home = ({ route }) => {
  const navi = useNavigation();

  const {
    data: { city } = {},
    isFetching: cityLoading,
    error: getCityError,
  } = useGetCityQuery(
    { slug: route.params?.city.slug },
    { skip: !route.params?.city }
  );

  const { data: { cities = [] } = {}, error: getLightListError } =
    useGetCitiesLightListQuery();

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if (!getLightListError) return;

    navigateToError(navi, getLightListError || getCityError);
  }, [getLightListError, getCityError]);

  const onChangeCity = async (index: number) => {
    if (!cities[index]) return;

    //@ts-ignore
    navi.navigate('Home', { city: cities[index] });
  };

  useEffect(() => {
    if (!cities.length) return;

    onChangeCity(0);
  }, [cities]);

  if (!city || !cities.length) {
    return <SafeLoader />;
  }

  const allGuidesCategories = uniq(
    flatten(city.guides?.map(({ categories }) => categories)).filter(
      im => !!im
    ) || []
  );
  const citiesImages = cities.map(({ image }) => image);

  return (
    <SafeAreaView className="relative w-screen h-screen">
      {cityLoading && <Loader />}
      <Carousel
        className="absolute top-0 left-0 w-full h-full"
        images={citiesImages}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={onChangeCity}
      />

      <View className="absolute w-full px-4">
        <SearchTotal />

        <Text className="text-white font-bold mt-6">
          {route.params.city.title}
        </Text>
      </View>

      <CityFullInfo city={city} title={route.params.city.title} />
    </SafeAreaView>
  );
};

export default Home;
