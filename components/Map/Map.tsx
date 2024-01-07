import MapView, { Region } from 'react-native-maps';
import { Place } from '@/types';
import { MapMarker } from '@/components/Map/MapMarker';
import { StyleSheet } from 'react-native';
import { getMiddleCoordinates } from '@/components/Map/Map.utils';
import { useState } from 'react';
import { LatLng } from 'react-native-maps/lib/sharedTypes';

type Props = {
  points: Place[];
  onPress: (point: Place & { isChosen?: boolean }) => void;
  region?: LatLng & { latitudeDelta?: number; longitudeDelta?: number };
};

export const Map = ({ points, onPress, region }: Props) => {
  const [state, setState] = useState({
    longitudeDelta: 0.2,
    latitudeDelta: 0.2,
  });
  const middlePoint = getMiddleCoordinates(points.map(({ coords }) => coords));

  const handlePointPress = (point: Place) => () => {
    onPress(point);
  };

  const onRegionChange = ({ longitudeDelta, latitudeDelta }) => {
    setState(prev => ({ ...prev, longitudeDelta, latitudeDelta }));
  };

  const { longitudeDelta, latitudeDelta } = state;
  const currentRegion = region
    ? { longitudeDelta, latitudeDelta, ...region }
    : undefined;
  return (
    <MapView
      style={styles.container}
      region={currentRegion}
      zoomEnabled
      zoomTapEnabled
      onRegionChange={onRegionChange}
      showsUserLocation
      showsMyLocationButton
      enableZoomControl
      initialRegion={{
        latitude: middlePoint.lat,
        longitude: middlePoint.lng,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
    >
      {points.map((point, index) => {
        const { coords, title, description, images, isChosen } = point;
        return (
          <MapMarker
            key={index}
            onPress={handlePointPress(point)}
            {...{ coords, title, description, images, isChosen }}
          />
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
