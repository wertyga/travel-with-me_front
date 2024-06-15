import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import { MainLayout } from '@/Layouts';
import { CText } from '@/components/CText';
import { CitiesList, CitiesMap } from '@/components/City';
import { FastImageBackground } from '@/components/FastImage';
import { GlobalSearch } from '@/components/GlobalSearch';
import { SafeLoader } from '@/components/SafeLoader';
import { useFocus, useStores } from '@/hooks';
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
  const { cities, getCityLightList } = useStores(stores => ({
    cities: stores.citiesListStore.cityLightList,
    getCityLightList: stores.citiesListStore.getCityLightList,
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
  }, []);

  if (!cities.length) {
    return <SafeLoader />;
  }

  return (
    <MainLayout
      style={styles.layout}
      bgColors={[CONSTANTS.colors.bg1, CONSTANTS.colors.bg3]}
    >
      <FastImageBackground
        source={SplashBgImage}
        style={StyleSheet.absoluteFillObject}
      >
        {/*<LinearGradient*/}
        {/*  colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.7)']}*/}
        {/*  style={StyleSheet.absoluteFillObject}*/}
        {/*></LinearGradient>*/}
      </FastImageBackground>

      <View
        style={{
          position: 'absolute',
          top: CONSTANTS.spaces.paddingTop,
          left: CONSTANTS.spaces.paddingHorizontal,
          width: '100%',
          zIndex: 1,
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
