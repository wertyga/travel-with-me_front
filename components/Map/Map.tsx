import MapView from 'react-native-maps';
import { Place } from '@/types';
import { MapMarker } from '@/components/Map/MapMarker';

type Props = {
  points: Place[];
};

export const Map = ({ points }: Props) => {
  const middlePoint = points[Math.floor(points.length / 2)];

  return (
    <MapView
      className="w-full h-full"
      initialRegion={{
        latitude: middlePoint.coords.lat,
        longitude: middlePoint.coords.lng,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
    >
      {points.map(({ coords, title, _id, description, images }) => {
        return (
          <MapMarker
            key={_id}
            images={images}
            {...{ coords, title, description }}
          />
        );
      })}
    </MapView>
  );
};
