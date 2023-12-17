import { Dimensions, Text, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SafeLoader } from '@/components/SafeLoader';
import { Loader } from '@/components/Loader';
import { useGetCityQuery, useGetCitiesLightListQuery } from '@/api';
import { navigateToError } from '@/utils';
import { CityFullInfo } from '@/components/City';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
import { Carousel } from '@/components/Carousel';
import { SearchTotal } from '@/components/SearchTotal';
import { GuidesCategories } from '@/components/Guide';
import * as React from 'react';
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';

// MOCK on future
// <LinearGradient
//   colors={[
//     'rgba(0, 0, 0, 0.1)',
//     'rgba(0, 0, 0, 0.4)',
//     'rgba(0, 0, 0, 0.1)',
//     'rgba(0, 0, 0, 0.01)',
//   ]}
//   locations={[0, 0.7, 0.95, 0.99]}
//   className="absolute w-full px-4 pb-4 pt-24"
// >

const Home = ({ route, navigation }) => {
  const navi = useNavigation();
  const [state, setState] = useState({
    filteredCategories: [],
  });

  const {
    data: { cities = [] } = {},
    error: getLightListError,
    isFetching,
    refetch: refetchCities,
  } = useGetCitiesLightListQuery();

  const currentCity = route.params?.city || cities[0];
  const {
    data: { city } = {},
    isFetching: cityLoading,
    error: getCityError,
  } = useGetCityQuery(
    { slug: currentCity?.slug },
    { skip: !currentCity?.slug }
  );

  const onChangeCategory = (category: string) => {
    setState(prev => ({
      ...prev,
      filteredCategories: prev.filteredCategories.includes(category)
        ? prev.filteredCategories.filter(cat => cat !== category)
        : [...prev.filteredCategories, category],
    }));
  };

  useEffect(() => {
    if (!getLightListError && !getCityError) return;

    navigateToError(navi, getLightListError || getCityError);
  }, [getLightListError, getCityError]);

  const onChangeCity = async (index: number) => {
    if (!cities[index]) return;

    //@ts-ignore
    navi.navigate('Home', { city: cities[index] });
  };

  useFocusEffect(
    useCallback(() => {
      if (!route.params?.isFromError || isFetching) return;
      refetchCities();
    }, [route.params?.isFromError])
  );

  if (!city || !cities.length) {
    return <SafeLoader />;
  }

  const allGuidesCityCategories = uniq(
    flatten(city.guides?.map(({ categories }) => categories)).filter(
      im => !!im
    ) || []
  );
  const citiesImages = cities.map(({ image }) => image);

  return (
    <MainLayout route={route} navigation={navigation} title="Home">
      {cityLoading && <Loader />}
      <Carousel
        images={citiesImages}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width}
        onSnapToItem={onChangeCity}
      />

      <View className="absolute w-full px-4 pb-4 pt-20">
        <SearchTotal />
        <GuidesCategories
          selected={state.filteredCategories}
          onChange={onChangeCategory}
          categories={allGuidesCityCategories}
          key={city.title}
        />

        <Text className="text-white font-bold mt-4">{currentCity.title}</Text>
      </View>

      <CityFullInfo
        key={city.title + state.filteredCategories.join('')}
        city={city}
        title={currentCity.title}
        filteredCategories={state.filteredCategories}
      />
    </MainLayout>
  );
};

export default Home;
