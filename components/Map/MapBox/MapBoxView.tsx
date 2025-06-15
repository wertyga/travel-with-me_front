import React, { FC, useEffect, useState } from 'react';

import { View, ViewStyle } from 'react-native';

import Constants from 'expo-constants';

import { getMiddleCoordinates } from '@/components/Map/Map.utils';
import Mapbox, { MapView } from '@rnmapbox/maps';

import { MapBoxMarker, TMapBoxMarkerProps } from './components/MapBoxMarker';

Mapbox.setAccessToken(Constants.expoConfig.extra.MAP_BOX_KEY);

export type TMapBoxViewProps<P> = {
  points: (P & Omit<TMapBoxMarkerProps, 'onPress'>)[];
  onPress?: (point: P & TMapBoxMarkerProps) => void;
  containerStyle?: ViewStyle;
  initialCoords?: [number, number];
};

export const MapBoxView = <P,>({
  points,
  onPress,
  containerStyle = {},
  initialCoords: propsInitialCoordinates = [0, 0],
}: TMapBoxViewProps<P>) => {
  const [initialCoords, setInitialCoords] = useState<[number, number]>(
    propsInitialCoordinates
  );

  useEffect(() => {
    const middlePoint = getMiddleCoordinates(
      points.map(({ coords }) => coords)
    );

    setInitialCoords([middlePoint.lng, middlePoint.lat]);
  }, [points]);

  return (
    <View style={{ flex: 1 }}>
      <MapView style={[{ flex: 1 }, containerStyle]}>
        <Mapbox.Camera zoomLevel={4} centerCoordinate={initialCoords} />

        {points.map(point => (
          <MapBoxMarker
            key={point._id}
            _id={point._id}
            image={point.image}
            coords={point.coords}
            onPress={() => onPress?.(point)}
          />
        ))}
      </MapView>
    </View>
  );
};
