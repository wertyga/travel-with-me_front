import { Image, View, StyleSheet, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { Path } from '@/types';
import { CONSTANTS } from '@/styles/constants';
import { getCompressedUrl } from '@/utils';

type Props = {
  coords: Path;
  title: string;
  description?: string;
  isChosen?: boolean;
  image?: string;
  markerSize?: number;
  children?: React.ReactNode;
  onPress: () => void;
};

const MARKER_SIZE = 50;

export const MapMarker = ({
  coords,
  image,
  title,
  markerSize = MARKER_SIZE,
  onPress,
  isChosen,
  children,
}: Props) => {
  const rootMarkerSize = {
    width: markerSize,
    height: markerSize,
    borderRadius: markerSize + 2,
  };
  const chosenMarkerSize = {
    width: markerSize - 2,
    height: markerSize - 2,
  };
  const markerInnerSize = {
    width: markerSize - 4,
    height: markerSize - 4,
    top: (markerSize - (markerSize - 4)) / 2,
    left: (markerSize - (markerSize - 4)) / 2,
  };
  return (
    <Marker
      coordinate={{ latitude: coords.lat, longitude: coords.lng }}
      onPress={onPress}
      tracksViewChanges={false}
    >
      <View style={{ ...styles.rootMarker, ...rootMarkerSize }}>
        {isChosen && (
          <View style={{ ...styles.chosen, ...chosenMarkerSize }}></View>
        )}
        <View style={{ ...styles.marker, ...markerInnerSize }}>
          {!!image && (
            <Image
              source={{ uri: getCompressedUrl(image, markerSize) }}
              style={styles.image}
            />
          )}
          {/*{!image && <Text style={styles.markerTitle}>{title.charAt(0)}</Text>}*/}
          {children}
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  rootMarker: {
    position: 'relative',
    backgroundColor: 'white',
  },
  chosen: {
    backgroundColor: CONSTANTS.colors.accent,
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 50,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    resizeMode: 'cover',
    backgroundColor: CONSTANTS.colors.blue,
    borderRadius: 50,
  },
  // markerTitle: {
  //   display: 'flex',
  //   textTransform: 'uppercase',
  //   verticalAlign: 'middle',
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   fontSize: 15,
  // },
});
