import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { FastImage } from '@/components/FastImage';
import { Path } from '@/types';
import { CONSTANTS } from '@/styles/constants';
import DefaultPointImage from '@/assets/images/default_point_image.png';

type Props = {
  coords: Path;
  description?: string;
  isChosen?: boolean;
  isChosenExists?: boolean;
  image?: string;
  markerSize?: number;
  children?: React.ReactNode;
  onPress: () => void;
};

const MARKER_SIZE = 50;

export const MapMarker = React.memo(
  ({
    coords,
    image,
    markerSize = MARKER_SIZE,
    onPress,
    isChosen,
    isChosenExists,
    children,
  }: Props) => {
    const [, setLoaded] = useState(false);

    const onLoad = useCallback(() => {
      setTimeout(() => {
        setLoaded(true);
      }, 300);
    }, []);

    const { rootMarkerSize, markerInnerSize, mainMarkerSize } = useMemo(() => {
      const realSize = isChosen ? markerSize + 5 : markerSize;
      return {
        mainMarkerSize: {
          height: realSize + 10,
        },
        rootMarkerSize: {
          width: realSize + 2,
          height: realSize + 2,
          borderRadius: realSize + 2,
          transform: [{ translateY: isChosen ? 0 : 8 }],
        },
        markerInnerSize: {
          width: realSize - 4,
          height: realSize - 4,
          top: (realSize - (realSize - 4)) / 2,
          left: (realSize - (realSize - 4)) / 2,
        },
      };
    }, [markerSize, isChosen]);

    const opacity = isChosenExists && !isChosen ? 0.6 : 1;
    return (
      <Marker
        coordinate={{ latitude: coords.lat, longitude: coords.lng }}
        onPress={onPress}
        tracksViewChanges={false}
        tracksInfoWindowChanges={false}
        opacity={opacity}
        style={[mainMarkerSize, isChosen && { zIndex: 5 }]}
      >
        <View
          style={[
            styles.rootMarker,
            rootMarkerSize,
            isChosen && styles.chosenParent,
          ]}
        >
          <View
            style={[
              styles.marker,
              markerInnerSize,
              isChosen && styles.chosenChild,
            ]}
          >
            <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
            <FastImage
              source={image || DefaultPointImage}
              width={markerInnerSize.width}
              style={styles.image}
              key={image}
              onLoad={onLoad}
            />
            {children}
          </View>
        </View>
        {isChosen && <View style={styles.chosenDot} />}
      </Marker>
    );
  }
);

const styles = StyleSheet.create({
  rootMarker: {
    position: 'relative',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    bottom: 0,
  },
  chosenParent: {
    backgroundColor: CONSTANTS.colors.bg2,
  },
  chosenMarker: {},
  chosenDot: {
    width: 6,
    height: 6,
    backgroundColor: CONSTANTS.colors.bg2,
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -3 }],
  },
  chosenChild: {},
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
