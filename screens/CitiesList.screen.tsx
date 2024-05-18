import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import citiesBgImage from '@/assets/images/cities-bg-3.png';

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
    <MainLayout style={styles.layout} bgImage={citiesBgImage}>
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
      {state.tab === 'list' && <CitiesList cities={cities} />}
      {state.tab === 'map' && <CitiesMap />}

      {isFetching && <Loader />}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: CONSTANTS.spaces.paddingTop,
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
