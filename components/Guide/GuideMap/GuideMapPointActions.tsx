import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Button from '@/components/Button';
import { PointGoToDirection } from '@/components/Point';

import { Place, SCREENS } from '@/types';

type Props = {
  point: Place;
  onOpenGallery: () => void;
  onPressGoToPointDirections?: (point: Place) => void;
};

export const GuideMapPointActions = ({
  point,
  onOpenGallery,
  onPressGoToPointDirections,
}: Props) => {
  return (
    <View style={styles.container}>
      <PointGoToDirection onPress={onPressGoToPointDirections} point={point} />

      {!!point.images.length && (
        <Button
          href={SCREENS.Place}
          hrefParams={{ placeSlug: point.slug }}
          noPaddings
          squareSize={40}
          rounded
        >
          <MaterialIcons name="attractions" size={24} color="white" />
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
});
