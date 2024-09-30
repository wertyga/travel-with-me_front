import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Marker } from 'react-native-maps';

import { MEDIA_SIZES } from '@/components/FastImage/FastImage';
import { FastImage } from 'components/FastImage';

import { Path } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import DefaultPointImage from '@/assets/images/default_point_image.png';

type Props = {
  coords: Path;
  description?: string;
  isChosen?: boolean;
  isChosenExists?: boolean;
  image?: string;
  title?: string;
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
  }: Props) => {
    if (!coords?.lat || !coords?.lng) return null;

    return (
      <Marker
        coordinate={{ latitude: coords.lat, longitude: coords.lng }}
        onPress={onPress}
        tracksInfoWindowChanges={false}
      >
        <View
          style={[
            styles.markerContainer,
            isChosen && styles.markerContainerChosen,
          ]}
        >
          <View
            style={[
              styles.imageContainer,
              isChosen && styles.imageContainerChosen,
            ]}
          >
            <View
              style={{
                overflow: 'hidden',
                borderRadius: markerSize,
                width: markerSize,
                height: markerSize,
              }}
            >
              <FastImage
                source={image || DefaultPointImage}
                style={{
                  ...StyleSheet.absoluteFillObject,
                }}
                hideProgress
                mediaSize={MEDIA_SIZES.ExtraSmall}
              />
            </View>
          </View>
          <View style={styles.caretContainer}>
            <View
              style={[styles.caretBorder, isChosen && styles.caretBorderChosen]}
            />
            <View style={[styles.caret, isChosen && styles.caretChosen]} />
          </View>
        </View>
      </Marker>
    );
  }
);

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 10, // Отступ снизу для хвостика
    paddingTop: 10, // Отступ сверху для изображения
    zIndex: 1,
  },
  markerContainerChosen: {
    zIndex: 5,
  },
  imageContainer: {
    backgroundColor: '#fff',
    padding: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    //
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10, // Для Android
  },
  imageContainerChosen: {
    backgroundColor: CONSTANTS.colors.bgMiddle,
    borderColor: CONSTANTS.colors.bgMiddle,
  },
  caretContainer: {
    position: 'absolute',
    bottom: 4, // Позиционирование под маркером
    alignItems: 'center',
  },
  caret: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff', // Цвет хвостика
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10, // Для Android
  },
  caretChosen: {
    borderTopColor: CONSTANTS.colors.bgMiddle,
  },
  caretBorder: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderTopWidth: 9,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff', // Цвет бордера хвостика
  },
  caretBorderChosen: {
    borderTopColor: CONSTANTS.colors.bgMiddle,
  },
});
