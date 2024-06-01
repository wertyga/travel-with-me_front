import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MainLayout } from '@/Layouts';
import { useGetCitiesLightListQuery } from '@/api';
import { CText } from '@/components/CText';
import { CitiesList, CitiesMap } from '@/components/City';
import { GlobalSearch } from '@/components/GlobalSearch';
import { Loader } from '@/components/Loader';
import { SafeLoader } from '@/components/SafeLoader';
import { useHandleFromError } from '@/hooks';
import { navigateToError } from '@/utils';
import { FONTS } from '@/types';
import { CONSTANTS } from '@/styles/constants';
import SplashBgImage from '@/assets/splash.png';

const HEADERS_LIST = [
  {
    title: 'Cities',
    id: 'list',
  },
  {
    title: 'Map',
    id: 'map',
  },
];

const CitiesListScreen = () => {
  const navi = useNavigation();
  const [state, setState] = useState({
    tab: 'list',
  });

  const {
    data: { cities = [] } = {},
    isFetching,
    error,
    refetch: refetchCities,
  } = useGetCitiesLightListQuery();

  const onChangeTab = (tab: string) => () => {
    setState(prev => ({ ...prev, tab }));
  };

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setState(prev => ({ ...prev, tab: 'list' }));
      };
    }, [])
  );

  useEffect(() => {
    if (!error) return;

    navigateToError(navi, error);
  }, [error, cities]);

  useHandleFromError(refetchCities, isFetching);

  if (!cities.length) {
    return <SafeLoader />;
  }

  return (
    <MainLayout
      style={styles.layout}
      bgColors={[CONSTANTS.colors.bg1, CONSTANTS.colors.bg3]}
    >
      <ImageBackground
        source={SplashBgImage}
        style={StyleSheet.absoluteFillObject}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.7)']}
          style={StyleSheet.absoluteFillObject}
        ></LinearGradient>
      </ImageBackground>

      <View
        style={{
          position: 'absolute',
          top: CONSTANTS.spaces.paddingTop,
          left: CONSTANTS.spaces.paddingHorizontal,
          width: '100%',
          zIndex: 20,
        }}
      >
        <GlobalSearch />
        <View style={styles.headers}>
          {HEADERS_LIST.map(({ title, id }) => {
            return (
              <CText
                key={id}
                style={[styles.header, state.tab === id && styles.chosenHeader]}
                onPress={onChangeTab(id)}
              >
                {title}
              </CText>
            );
          })}
        </View>
      </View>

      {state.tab === 'list' && (
        <CitiesList cities={cities} style={{ paddingTop: 160 }} />
      )}
      {state.tab === 'map' && (
        <View style={{ paddingTop: 160 }}>
          <CitiesMap />
        </View>
      )}
      {isFetching && <Loader />}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: 0,
  },
  headers: {
    flexDirection: 'row',
  },
  header: {
    fontSize: 30,
    marginBottom: 15,
    marginTop: 20,
    fontFamily: FONTS.CrimsonBold,
    width: '50%',
    textAlign: 'center',
  },
  chosenHeader: {
    textDecorationLine: 'underline',
  },
});

export default CitiesListScreen;
