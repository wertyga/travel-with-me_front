import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import CarouselEx from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { SafeLoader } from '@/components/SafeLoader';
import { Loader } from '@/components/Loader';
import { Image } from '@/components/Image';
import { useGetCityQuery, useGetCitiesLightListQuery } from '@/api';
import { getCompressedUrl, navigateToError } from '@/utils';
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';
import { useHandleFromError } from '@/hooks';
import { CityScreenMeta } from '@/components/City/CityScreenMeta/CityScreenMeta';

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
    return <SafeLoader image={currentCity.image} />;
  }

  const citiesImages = cities.map(({ image }) => image);

  const windowWidth = Dimensions.get('window').width;
  return (
    <MainLayout style={styles.layout} headerTitle={currentCity.title}>
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
            <Image
              key={item}
              uri={item}
              width={windowWidth}
              style={styles.cityImage}
            />
            // <Image
            //   key={item}
            //   style={styles.cityImage}
            //   source={{
            //     uri: getCompressedUrl(item, windowWidth),
            //   }}
            // />
          );
        }}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
      />

      <CityScreenMeta city={city} />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  cityImage: {
    width: '100%',
    height: '100%',
  },
});

export default Home;
