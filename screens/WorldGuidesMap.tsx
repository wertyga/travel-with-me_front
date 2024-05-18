import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { MainLayout } from '@/Layouts';
import { useGetGuidesCountQuery } from '@/api';
import { CText } from '@/components/CText';
import { getMiddleCoordinates } from '@/components/Map/Map.utils';
import { MapMarker } from '@/components/Map/MapMarker';
import { City, FONTS, SCREENS } from '@/types';

const EUROPE_REGION = {
  latitude: 43.13591618938807,
  latitudeDelta: 64.52384581909979,
  longitude: 13.603910151869059,
  longitudeDelta: 61.60953674465418,
};

const WorldGuidesMap = () => {
  const navi = useNavigation();
  const { data: cities = [] } = useGetGuidesCountQuery();

  const navigateToCity = (city: City) => () => {
    navi.navigate(SCREENS.Home, { city });
  };

  const middlePoint = getMiddleCoordinates(cities.map(({ coords }) => coords));

  return (
    <MainLayout headerTitle="World Map">
      {!!middlePoint && (
        <View style={styles.map}>
          <MapView
            style={styles.mapSelf}
            region={EUROPE_REGION}
            zoomEnabled
            zoomTapEnabled
            enableZoomControl
          >
            {cities.map(city => {
              return (
                <MapMarker
                  key={city.title}
                  coords={city.coords}
                  image={city.image}
                  title={city.guidesCount}
                  markerSize={42}
                  onPress={navigateToCity(city)}
                >
                  <CText style={styles.textCount}>{city.guidesCount}</CText>
                </MapMarker>
              );
            })}
          </MapView>
        </View>
      )}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: Dimensions.get('window').height - 180,
    marginTop: 20,
    borderRadius: 6,
    overflow: 'hidden',
  },
  mapSelf: {
    width: '100%',
    height: '100%',
  },
  textCount: {
    position: 'absolute',
    fontSize: 18,
    fontFamily: FONTS.OpenSansSemiBold,
  },
});

export default WorldGuidesMap;
