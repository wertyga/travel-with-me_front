import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import CarouselEx from 'react-native-snap-carousel';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
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
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';
import { useHandleFromError } from '@/hooks';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { CONSTANTS } from '@/styles/constants';

const Home = ({ route, navigation }) => {
  const navi = useNavigation();
  const carouselRef = useRef(null);
  const [state, setState] = useState({
    filteredCategories: [],
    cityIndex: 0,
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

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if (!getLightListError && !getCityError) return;

    navigateToError(navi, getLightListError || getCityError);
  }, [getLightListError, getCityError]);

  const onChangeCity = async (index: number) => {
    if (!cities[index]) return;

    //@ts-ignore
    navi.navigate('Home', { city: cities[index] });
  };

  useEffect(() => {
    const cityIndex = cities.findIndex(city => city._id === currentCity._id);
    if (cityIndex && city?.slug === currentCity?.slug) {
      setTimeout(() => {
        carouselRef.current?.snapToItem?.(cityIndex, false, false);
      }, 100);
    }
  }, [currentCity, cities, city]);

  useHandleFromError(route, refetchCities, isFetching);

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
    <MainLayout style={styles.layout}>
      {cityLoading && <Loader />}

      <CarouselEx
        layout="tinder"
        ref={c => {
          carouselRef.current = c;
        }}
        data={citiesImages}
        disableIntervalMomentum
        onSnapToItem={onChangeCity}
        renderItem={({ item }: any) => {
          return (
            <ImageBackground
              key={item}
              style={styles.cityImage}
              source={{ uri: item }}
            >
              <LinearGradient
                style={styles.imagePlaceholder}
                colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.01)']}
              />
            </ImageBackground>
          );
        }}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width}
      />
      <CityScreenHeader style={styles.header} title={currentCity.title} />

      {/*<View className="absolute w-full px-4 pb-4 pt-20">*/}
      {/*  <GuidesCategories*/}
      {/*    selected={state.filteredCategories}*/}
      {/*    onChange={onChangeCategory}*/}
      {/*    categories={allGuidesCityCategories}*/}
      {/*    key={city.title}*/}
      {/*  />*/}

      {/*  <Text className="text-white font-bold mt-4">{currentCity.title}</Text>*/}
      {/*</View>*/}

      {/*<CityFullInfo*/}
      {/*  key={city.title + state.filteredCategories.join('')}*/}
      {/*  city={city}*/}
      {/*  title={currentCity.title}*/}
      {/*  filteredCategories={state.filteredCategories}*/}
      {/*/>*/}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 0,
  },
  header: {
    position: 'absolute',
    top: CONSTANTS.spaces.paddingTop,
    zIndex: 10,
  },
  cityImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
  },
});

export default Home;
