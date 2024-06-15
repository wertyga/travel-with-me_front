import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import { PointGoToDirection } from '@/components/Point';
import { Place } from '@/types';

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
        <Button style={styles.btn} onPress={onOpenGallery}>
          <Ionicons name="images-outline" size={20} color="white" />
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
  btn: {
    minWidth: 40,
    height: 40,
    borderRadius: 50,
  },
});
