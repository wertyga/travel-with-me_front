import { Dimensions, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';
import image from 'react-native-reanimated/src/reanimated2/component/Image';

const Home = ({ route, navigation }) => {
  const navi = useNavigation();
  const [state, setState] = useState({
    filteredCategories: [],
  });

  const {
    data: { city } = {},
    isFetching: cityLoading,
    error: getCityError,
  } = useGetCityQuery(
    { slug: route.params?.city?.slug },
    { skip: !route.params?.city }
  );

  const {
    data: { cities = [] } = {},
    error: getLightListError,
    isFetching,
    refetch: refetchCities,
  } = useGetCitiesLightListQuery();

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
      if (!cities.length) return;

      onChangeCity(0);
    }, [cities])
  );

  useFocusEffect(
    useCallback(() => {
      if (!route.params?.isFromError || isFetching) return;
      refetchCities();
    }, [route.params?.isFromError])
  );

  if (!city || !cities.length || !route.params?.city) {
    return <SafeLoader />;
  }

  const allGuidesCityCategories = uniq(
    flatten(city.guides?.map(({ categories }) => categories)).filter(
      im => !!im
    ) || []
  );
  const citiesImages = cities.map(({ image }) => image);

  return (
    <MainLayout className="" route={route} navigation={navigation} title="Home">
      {cityLoading && <Loader />}
      <Carousel
        className="absolute top-0 left-0 w-full h-full"
        images={citiesImages}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={onChangeCity}
      />

      <LinearGradient
        colors={[
          'rgba(0, 0, 0, 0.1)',
          'rgba(0, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0.1)',
          'rgba(0, 0, 0, 0.01)',
        ]}
        locations={[0, 0.7, 0.95, 0.99]}
        className="absolute w-full px-4 pb-4 pt-24"
      >
        <SearchTotal />
        <GuidesCategories
          selected={state.filteredCategories}
          onChange={onChangeCategory}
          categories={allGuidesCityCategories}
          key={city.title}
        />

        <Text className="text-white font-bold mt-4">
          {route.params.city.title}
        </Text>
      </LinearGradient>

      <CityFullInfo
        key={city.title + state.filteredCategories.join('')}
        city={city}
        title={route.params.city.title}
        filteredCategories={state.filteredCategories}
      />
    </MainLayout>
  );
};

export default Home;
