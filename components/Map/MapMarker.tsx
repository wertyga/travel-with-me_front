import { Image, View, StyleSheet, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { Path } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  coords: Path;
  title: string;
  description?: string;
  isChosen?: boolean;
  images?: string[];
  onPress: () => void;
};

export const MapMarker = ({
  coords,
  images,
  title,
  onPress,
  isChosen,
}: Props) => {
  return (
    <Marker
      coordinate={{ latitude: coords.lat, longitude: coords.lng }}
      onPress={onPress}
      tracksViewChanges={false}
    >
      <View style={styles.rootMarker}>
        {isChosen && <View style={styles.chosen}></View>}
        <View style={styles.marker}>
          {!!images?.[0] && (
            <Image source={{ uri: images?.[0] }} style={styles.image} />
          )}
          {!images?.[0] && (
            <Text style={styles.markerTitle}>{title.charAt(0)}</Text>
          )}
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  rootMarker: {
    position: 'relative',
    width: 52,
    height: 52,
    borderRadius: 53,
    // borderStyle: 'solid',
    // borderColor: CONSTANTS.colors.bgDark,
    // borderWidth: 1,
  },
  chosen: {
    borderColor: CONSTANTS.colors.bgDark,
    backgroundColor: CONSTANTS.colors.accent,
    borderWidth: 1,
    position: 'absolute',
    // ...StyleSheet.absoluteFillObject,
    width: 50,
    height: 50,
    top: 0,
    left: 0,
    borderRadius: 50,
  },
  marker: {
    width: 42,
    height: 42,
    backgroundColor: CONSTANTS.colors.blue,
    borderRadius: 50,
    top: 4,
    left: 4,
    position: 'absolute',
    borderColor: CONSTANTS.colors.bgDark,
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // position: 'relative',
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
