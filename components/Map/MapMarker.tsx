import { Image, Alert, Linking } from 'react-native';
import { Marker } from 'react-native-maps';
import { Path } from '@/types';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Callout from '@/components/Map/Callout';

type Props = {
  coords: Path;
  title: string;
  description?: string;
  images?: string[];
};

export const MapMarker = ({ coords, images, title, description }: Props) => {
  const navi = useNavigation();

  return (
    <Marker coordinate={{ latitude: coords.lat, longitude: coords.lng }}>
      {!!images?.[0] ? (
        <>
          <FontAwesome5 name="map-marker" size={32} color="black" />
          <Image
            source={{ uri: images[0] }}
            className="rounded-full w-4 h-4 object-cover absolute top-1 left-1"
          />
        </>
      ) : (
        <FontAwesome5 name="map-marker" size={24} color="black" />
      )}
      <Callout {...{ title, description, images, coords }} />
    </Marker>
  );
};
