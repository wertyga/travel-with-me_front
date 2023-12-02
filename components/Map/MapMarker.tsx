import { Image, View, Text, Button } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { Path } from '@/types';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import OpenURLButton from '@/components/OpenURLButton';

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
      <Callout>
        <View className="bg-white rounded-xl px-2 py-2" style={{ width: 250 }}>
          <Text className="text-xl mb-2">{title}</Text>
          {description && (
            <Text className="mb-2">{description.substring(0, 100)}...</Text>
          )}
          <View className="flex-row items-center mb-2">
            {images?.map(image => (
              <Image
                source={{ uri: image }}
                className="w-14 h-14 object-cover mr-1"
              />
            ))}
          </View>
          <Button
            title="Read more"
            onPress={() => navi.navigate('Login')}
            className="text-blue-500"
          />
          <OpenURLButton
            url={`https://maps.google.com/?q=${coords.lat},${coords.lng}`}
            className="text-blue-500"
          >
            Navigate
          </OpenURLButton>
        </View>
      </Callout>
    </Marker>
  );
};
