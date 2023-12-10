import { Path } from '@/types';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { Callout } from 'react-native-maps';
import Button from '@/components/Button';

type CustomCalloutProps = {
  title: string;
  description?: string;
  images?: string[];
  coords: Path;
};

const CustomCallout = ({
  title,
  description,
  images,
  coords,
}: CustomCalloutProps) => {
  const navigation = useNavigation();

  const openMaps = () => {
    Alert.alert(
      'Open in Maps',
      'Choose the app to open this location',
      [
        {
          text: 'Google Maps',
          onPress: () =>
            Linking.openURL(
              `https://maps.google.com/?q=${coords.lat},${coords.lng}`
            ),
        },
        {
          text: 'Apple Maps',
          onPress: () =>
            Linking.openURL(
              `http://maps.apple.com/?sll=${coords.lat},${coords.lng}&daddr=${coords.lat},${coords.lng}`
            ),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <Callout tooltip={true}>
      <View className="bg-white rounded-2xl px-6 py-6" style={{ width: 400 }}>
        <View className="flex-row justify-between mb-2 mr-1">
          <Text className="text-xl font-bold">{title}</Text>
          {!!images?.length && (
            <FontAwesome5 name="map-marked" size={24} color="black" />
          )}
        </View>
        {description && (
          <>
            <Text className="mb-4 text-gray-500">
              {description.substring(0, 150)}...
            </Text>
            <View className="flex-row justify-between mb-2">
              <Button
                className="bg-transparent mb-4 min-w-0 p-0 flex"
                textClassName="text-black text-sm"
                onPress={() => navigation.navigate('Login')}
              >
                Read more
                <FontAwesome5 name="arrow-right" size={16} color="black" />
              </Button>
            </View>
          </>
        )}
        <View className="flex-row justify-between items-center mb-4 pr-2">
          <View className="flex-row items-center mb-4">
            {images?.map(image => (
              <Image
                key={image}
                source={{ uri: image }}
                className="w-16 h-16 object-cover mr-1"
              />
            ))}
          </View>
          <TouchableOpacity onPress={() => openMaps()} className="mb-3">
            <FontAwesome5 name="directions" size={54} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Callout>
  );
};

export default CustomCallout;
