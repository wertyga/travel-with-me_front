import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import CarouselEx from 'react-native-snap-carousel';
import { useNavigation } from '@/hooks';
import { SafeLoader } from '@/components/SafeLoader';
import { FastImage } from '@/components/Image';
import { useGetCityQuery, useGetCitiesLightListQuery } from '@/api';
import { navigateToError } from '@/utils';
import { MainLayout } from '@/Layouts/MainLayout/MainLayout';
import { useHandleFromError } from '@/hooks';
import { CityScreenMeta } from '@/components/City/CityScreenMeta/CityScreenMeta';
import { LinearGradient } from 'expo-linear-gradient';

const CityScreen = ({ route: { params } }) => {
  const navi = useNavigation();
  const carouselRef = useRef<CarouselEx<any> | null>(null);

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
  } = useGetCityQuery({ slug: params?.city.slug });

  useEffect(() => {
    if (!getLightListError && !getCityError) return;

    navigateToError(navi, getLightListError || getCityError);
  }, [getLightListError, getCityError]);

  const onChangeCity = async (index: number) => {
    if (!cities[index]) return;

    navi.setParams({ city: cities[index] });
  };

  useEffect(() => {
    const cityIndex = cities.findIndex(city => city._id === params?.city._id);

    if (cityIndex && city?._id === params?.city._id) {
      setTimeout(() => {
        carouselRef.current?.snapToItem?.(cityIndex, false, false, false);
      });
    }
  }, [cities, city]);

  useHandleFromError(refetchCities, isFetching);

  if (params?.city._id !== city?._id) {
    return (
      <SafeLoader
        image={params.city.image}
        textColor="white"
        indicatorColor="white"
      />
    );
  }

  const citiesImages = cities.map(({ image }) => image);
  const windowWidth = Dimensions.get('window').width;

  return (
    <MainLayout
      style={{ paddingHorizontal: 0 }}
      headerTitle={city.title}
      isLoading={cityLoading}
      loaderTextColor="white"
    >
      <View style={styles.layout}>
        <CarouselEx
          layout="tinder"
          ref={c => {
            carouselRef.current = c;
          }}
          data={citiesImages}
          disableIntervalMomentum
          onSnapToItem={onChangeCity}
          renderItem={({ item }: any) => {
            return <FastImage key={item} uri={item} style={styles.cityImage} />;
          }}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
        />
      </View>

      {!cityLoading && <CityScreenMeta city={city} />}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('window').height,
  },
  cityImage: {
    width: '100%',
    height: '100%',
  },
});

export default CityScreen;
