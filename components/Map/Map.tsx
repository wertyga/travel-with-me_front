import MapView from 'react-native-maps';
import { Place } from '@/types';
import { MapMarker } from '@/components/Map/MapMarker';
import { StyleSheet } from 'react-native';
import { getMiddleCoordinates } from '@/components/Map/Map.utils';

type Props = {
  points: Place[];
  onPress: (point: Place) => void;
};

export const Map = ({ points, onPress }: Props) => {
  const middlePoint = getMiddleCoordinates(points);

  const handlePointPress = (point: Place) => () => {
    onPress(point);
  };

  return (
    <MapView
      style={styles.container}
      showsUserLocation
      showsMyLocationButton
      enableZoomControl
      initialRegion={{
        latitude: middlePoint.coords.lat,
        longitude: middlePoint.coords.lng,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
    >
      {points.map((point, index) => {
        const { coords, title, description, images } = point;
        return (
          <MapMarker
            key={index}
            onPress={handlePointPress(point)}
            {...{ coords, title, description, images }}
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
