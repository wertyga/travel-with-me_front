import { Image, View, StyleSheet, Text, ImageBackground } from 'react-native';
import { Marker } from 'react-native-maps';
import { Path } from '@/types';
import { CONSTANTS } from '@/styles/constants';
import { Svg } from 'react-native-svg';
import { getCompressedUrl } from '@/utils';
import { useReducer, useState } from 'react';
import cn from '@/app/classname';

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
  const [isLoaded, setLoaded] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const onLoad = () => {
    setTimeout(() => {
      setLoaded(true);
    }, 300);
  };

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
        <View style={{ ...styles.marker, ...markerInnerSize }}>
          <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
          {!!image && (
            <Image
              source={{ uri: getCompressedUrl(image, markerInnerSize.width) }}
              style={styles.image}
              key={image}
              onLoad={onLoad}
            />
          )}
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
    backgroundColor: CONSTANTS.colors.blue,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    resizeMode: 'cover',
    borderRadius: 50,
  },
});
