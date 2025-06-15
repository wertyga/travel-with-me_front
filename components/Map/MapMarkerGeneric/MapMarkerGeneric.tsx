import React, { FC } from 'react';

import { StyleSheet, View } from 'react-native';

import { MEDIA_SIZES } from '@/components/FastImage/FastImage';
import { FastImage } from 'components/FastImage';

import { Path } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import DefaultPointImage from '@/assets/images/default_point_image.png';

export type TMapMarkerGenericProps = {
  coords: Path;
  isChosen?: boolean;
  image?: string | number;
  markerSize?: number;
};

const MARKER_SIZE = 50;

export const MapMarkerGeneric: FC<TMapMarkerGenericProps> = React.memo(
  ({ coords, image, markerSize = MARKER_SIZE, isChosen }) => {
    if (!coords?.lat || !coords?.lng) return null;

    return (
      <View style={styles.container}>
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
              style={StyleSheet.absoluteFillObject}
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
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 2,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  imageContainerChosen: {
    backgroundColor: CONSTANTS.colors.bgMiddle,
    borderColor: CONSTANTS.colors.bgMiddle,
  },

  caretContainer: {
    position: 'absolute',
    top: '95%', // ⬅️ places caret right *below* the circle
    left: '50%',
    transform: [{ translateX: -8 }],
    height: 10,
    width: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  caretBorder: {
    position: 'absolute',
    top: -1,
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderTopWidth: 9,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff', // outer border
    zIndex: 1,
  },

  caretBorderChosen: {
    borderTopColor: CONSTANTS.colors.bgMiddle,
  },

  caret: {
    marginTop: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff', // inner fill
    zIndex: 2,
  },

  caretChosen: {
    borderTopColor: CONSTANTS.colors.bgMiddle,
  },
});
