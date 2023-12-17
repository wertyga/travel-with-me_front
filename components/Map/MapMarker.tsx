import { Image, View, StyleSheet, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { Path } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  coords: Path;
  title: string;
  description?: string;
  images?: string[];
  onPress: () => void;
};

export const MapMarker = ({ coords, images, title, onPress }: Props) => {
  return (
    <Marker
      coordinate={{ latitude: coords.lat, longitude: coords.lng }}
      onPress={onPress}
      tracksViewChanges={false}
    >
      <View style={styles.marker}>
        {!!images?.[0] && (
          <Image source={{ uri: images?.[0] }} style={styles.image} />
        )}
        {!images?.[0] && (
          <Text style={styles.markerTitle}>{title.charAt(0)}</Text>
        )}
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    width: 42,
    height: 42,
    backgroundColor: CONSTANTS.colors.blue,
    borderRadius: 50,
    borderColor: CONSTANTS.colors.dark,
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    resizeMode: 'cover',
    backgroundColor: 'red',
    borderRadius: 50,
  },
  markerTitle: {
    display: 'flex',
    textTransform: 'uppercase',
    verticalAlign: 'middle',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
});
