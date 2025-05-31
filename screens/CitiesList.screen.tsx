import { useState } from 'react';

import { Image, StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import { CText } from '@/components/CText';
import { CitiesList, CitiesMap } from '@/components/City';
import { SafeLoader } from '@/components/SafeLoader';
import { GlobalSearch } from '@/components/Search';
import { useFocus, useNavigation, useStores } from '@/hooks';

import { FONTS, SCREENS } from '@/types';

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

  const { cities, getCityLightList, isNetConnected } = useStores(stores => ({
    cities: stores.citiesListStore.cityLightList,
    getCityLightList: stores.citiesListStore.getCityLightList,
    isNetConnected: stores.appStateStore.isNetConnected,
  }));

  const [state, setState] = useState({
    tab: 'list',
  });

  const onChangeTab = (tab: string) => () => {
    setState(prev => ({ ...prev, tab }));
  };

  useFocus(() => {
    getCityLightList();

    return () => {
      setState(prev => ({ ...prev, tab: 'list' }));
    };
  }, [isNetConnected]);

  useFocus(() => {
    if (isNetConnected === false && !cities.length) {
      navi.navigate(SCREENS.Offline);
    }

    return () => {};
  }, [isNetConnected, cities]);

  if (!cities.length) {
    return <SafeLoader />;
  }

  return (
    <MainLayout
      style={styles.layout}
      headerTitle={!isNetConnected && 'Offline Mode'}
      bgContent={
        <Image
          source={SplashBgImage}
          style={{ width: '100%', height: '100%' }}
          blurRadius={7}
        />
      }
    >
      <View
        style={{
          marginTop: CONSTANTS.spaces.paddingTop,
          zIndex: 1,
        }}
      >
        <View style={{ height: 60 }}>{isNetConnected && <GlobalSearch />}</View>

        <View style={styles.headers}>
          {HEADERS_LIST.map(({ title, id }) => {
            return (
              <CText
                key={id}
                style={[styles.header, state.tab === id && styles.chosenHeader]}
                onPress={onChangeTab(id)}
                light
              >
                {title}
              </CText>
            );
          })}
        </View>
      </View>

      {state.tab === 'list' && (
        <CitiesList cities={cities} style={{ paddingTop: 50 }} key="list" />
      )}
      {state.tab === 'map' && (
        <CitiesMap
          containerStyle={{ marginTop: 50, marginBottom: 5 }}
          key="map"
        />
      )}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: 0,
  },
  headers: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    left: 0,
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

export default observer(CitiesListScreen);
