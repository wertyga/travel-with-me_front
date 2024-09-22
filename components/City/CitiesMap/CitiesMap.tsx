import React, { useEffect } from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { observer } from 'mobx-react-lite';

import {
  customMapStyles,
  getMiddleCoordinates,
} from '@/components/Map/Map.utils';
import { MapMarker } from '@/components/Map/MapMarker';
import { useNavigation } from '@/hooks';
import { useStores } from '@/hooks';

import { City, FONTS, SCREENS } from '@/types';

const EUROPE_REGION = {
  latitude: 43.13591618938807,
  latitudeDelta: 64.52384581909979,
  longitude: 13.603910151869059,
  longitudeDelta: 61.60953674465418,
};

type Props = {
  containerStyle?: ViewStyle;
};

export const CitiesMapComponent = ({ containerStyle }: Props) => {
  const navi = useNavigation();
  const { getCityLightList, cityLightList } = useStores(stores => ({
    getCityLightList: stores.citiesListStore.getCityLightList,
    cityLightList: stores.citiesListStore.cityLightList,
  }));

  useEffect(() => {
    if (!cityLightList.length) {
      getCityLightList();
    }
  }, []);

  const navigateToCity = (city: City) => () => {
    navi.navigate(SCREENS.City, { city });
  };

  const middlePoint = getMiddleCoordinates(
    cityLightList.map(({ coords }) => coords)
  );

  if (!middlePoint) {
    return null;
  }

  return (
    <View style={[styles.map, containerStyle]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapSelf}
        region={EUROPE_REGION}
        zoomEnabled
        zoomTapEnabled
        customMapStyle={customMapStyles}
      >
        {cityLightList.map(city => {
          return (
            <MapMarker
              key={city.title}
              coords={city.coords}
              image={city.image}
              markerSize={42}
              onPress={navigateToCity(city)}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    borderRadius: 6,
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  mapSelf: {
    ...StyleSheet.absoluteFillObject,
  },
  textCount: {
    position: 'absolute',
    fontSize: 18,
    fontFamily: FONTS.OpenSansSemiBold,
  },
});

export const CitiesMap = observer(CitiesMapComponent);
