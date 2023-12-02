import { Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Path } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  coords: Path;
  image?: string;
};

export const MapMarker = ({ coords, image }: Props) => {
  return (
    <Marker coordinate={{ latitude: coords.lat, longitude: coords.lng }}>
      <View className="w-8 h-20">
        <View
          className={`w-8 h-8 rounded-full bg-[${CONSTANTS.colors.blue}] justify-center items-center`}
        >
          {!!image && (
            <Image
              source={{ uri: image }}
              className="rounded-full w-5 h-5 object-cover"
            />
          )}
        </View>
      </View>
    </Marker>
  );
};
