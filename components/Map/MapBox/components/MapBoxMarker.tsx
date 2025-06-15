import { FC } from 'react';

import { Touchable, TouchableOpacity } from 'react-native';

import Mapbox, { MapView } from '@rnmapbox/maps';

import {
  MapMarkerGeneric,
  TMapMarkerGenericProps,
} from '../../MapMarkerGeneric';

export type TMapBoxMarkerProps = Pick<
  TMapMarkerGenericProps,
  'coords' | 'image'
> & {
  _id: string;
  onPress?: () => void;
};

export const MapBoxMarker: FC<TMapBoxMarkerProps> = ({
  _id,
  coords,
  image,
  onPress,
}) => {
  return (
    <Mapbox.MarkerView coordinate={[coords.lng, coords.lat]} id={_id}>
      <TouchableOpacity onPress={onPress}>
        <MapMarkerGeneric
          coords={coords}
          isChosen={false}
          image={image}
          markerSize={30}
        />
      </TouchableOpacity>
    </Mapbox.MarkerView>
  );
};
