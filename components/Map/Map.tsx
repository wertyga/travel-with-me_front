import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';
import { Path, Place } from '@/types';
import { MapMarker } from '@/components/Map/MapMarker';

type Props = {
  onChangeRegion: () => void;
  coords: Path;
  deltaCoords: Path;
  points: Place[];
};

export const Map = ({ coords, deltaCoords, points }: Props) => {
  const [state, setState] = useState({
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const onChange = region => {
    console.log({ region });
  };

  const middlePoint = points[Math.floor(points.length / 2)];

  return (
    <MapView
      className="w-full h-full"
      // initialRegion={}
      initialRegion={{
        latitude: middlePoint.coords.lat,
        longitude: middlePoint.coords.lng,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      // onRegionChange={onChange}
    >
      {points.map(point => {
        return (
          <MapMarker
            key={point._id}
            coords={point.coords}
            image={point.images[0]}
          />
        );
      })}
    </MapView>
  );
};
