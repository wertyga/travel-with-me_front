import React, { useEffect, useState } from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import Constants from 'expo-constants';

import { observer } from 'mobx-react-lite';

import { MyLocation } from '@/components/Map/MyLocation';
import { MyLocationMarker } from '@/components/Map/MyLocation/MyLocationMarker';
import { useStores } from '@/hooks';
import Mapbox, { CameraAnimationMode, MapView } from '@rnmapbox/maps';

import { MapBoxMarker, TMapBoxMarkerProps } from './MapBoxMarker';

Mapbox.setAccessToken(Constants.expoConfig.extra.MAP_BOX_KEY);

export type TMapBoxViewProps<P> = {
  points: (P & Omit<TMapBoxMarkerProps, 'onPress'>)[];
  onPress?: (point: P & TMapBoxMarkerProps) => void;
  containerStyle?: ViewStyle;
  initialCoords?: [number, number]; // [lng, lat]
  zoomLevel?: number;
  isShowMyLocation?: boolean;
  showMyLocationBtnStyle?: ViewStyle;
  animationMode?: CameraAnimationMode;
  children?: React.ReactNode;
  onMapPress?: (e: GeoJSON.Feature) => void;
};

const MapBoxViewComponent = <P,>({
  points,
  onPress,
  containerStyle = {},
  zoomLevel = 4,
  initialCoords: propsInitialCoordinates = [0, 0],
  animationMode = 'none',
  children,
  isShowMyLocation,
  showMyLocationBtnStyle,
  onMapPress,
}: TMapBoxViewProps<P>) => {
  const { liveCoords } = useStores(stores => ({
    liveCoords: stores.locationStore.liveCoords,
  }));

  const [currentCoordinates, setCurrentCoordinates] = useState<
    [number, number]
  >(propsInitialCoordinates);

  const handleOnPointPress = (point: P & TMapBoxMarkerProps) => {
    setCurrentCoordinates([point.coords.lng, point.coords.lat]);
    onPress?.(point);
  };

  const pressOnMyLocation = () => {
    if (!liveCoords) return;

    setCurrentCoordinates([liveCoords.lng, liveCoords.lat]);
  };

  useEffect(() => {
    setCurrentCoordinates(propsInitialCoordinates);
  }, [propsInitialCoordinates[0], propsInitialCoordinates[1]]);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <MapView
        style={[{ flex: 1, ...StyleSheet.absoluteFillObject }, containerStyle]}
        onPress={onMapPress}
      >
        <Mapbox.Camera
          zoomLevel={zoomLevel}
          centerCoordinate={currentCoordinates}
          animationMode={animationMode}
        />

        {points.map(point => (
          <MapBoxMarker
            key={point._id}
            _id={point._id}
            image={point.image}
            coords={point.coords}
            onPress={() => handleOnPointPress(point)}
          />
        ))}
        {isShowMyLocation && <MyLocationMarker />}
      </MapView>

      {isShowMyLocation && (
        <MyLocation
          onPress={pressOnMyLocation}
          style={showMyLocationBtnStyle}
        />
      )}
      {children}
    </View>
  );
};

export const MapBoxView = observer(MapBoxViewComponent);
