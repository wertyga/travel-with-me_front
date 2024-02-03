import { StyleSheet, View } from 'react-native';
import Button from '@/components/Button';
import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Place } from '@/types';
import { CONSTANTS } from '@/styles/constants';
import React from 'react';
import { openGoogleMap } from '@/components/Map/Map.utils';

type Props = {
  point: Place;
  onOpenGallery: () => void;
  navigateToPoint: () => void;
};

export const GuideMapPointActions = ({
  point,
  onOpenGallery,
  navigateToPoint,
}: Props) => {
  return (
    <View style={styles.container}>
      <Button style={styles.btn} onPress={() => openGoogleMap(point.coords)}>
        <MaterialIcons name="directions" size={24} color="white" />
      </Button>
      {!!point.images.length && (
        <Button style={styles.btn} onPress={onOpenGallery}>
          <Ionicons name="images-outline" size={20} color="white" />
        </Button>
      )}
      <Button filled style={styles.btn} onPress={navigateToPoint} noPaddings>
        <Octicons name="dot" size={24} color="white" />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    width: 40,
    height: 40,
    backgroundColor: CONSTANTS.colors.bg1,
    borderRadius: 50,
  },
});
