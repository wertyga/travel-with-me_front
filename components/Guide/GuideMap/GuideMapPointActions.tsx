import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '@/components/Button';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Place } from '@/types';
import { CONSTANTS } from '@/styles/constants';
import { openGoogleMap } from '@/components/Map/Map.utils';
import { CText } from '@/components/CText';
import cn from '@/app/classname';

type Props = {
  point: Place;
  onOpenGallery: () => void;
  distanceToPoint?: string;
  onPressGoToPointDirections?: (point: Place) => void;
};

export const GuideMapPointActions = ({
  point,
  onOpenGallery,
  distanceToPoint,
  onPressToDirection,
}: Props) => {
  const onDirectionPress = async () => {
    if (onPressToDirection) {
      await onPressToDirection(point);
    }

    openGoogleMap(point.coords);
  };

  return (
    <View style={styles.container}>
      <Button
        style={cn(styles.btn, { [!!distanceToPoint]: { width: undefined } })}
        onPress={onDirectionPress}
      >
        <MaterialIcons name="directions" size={24} color="white" />
        {!!distanceToPoint && (
          <CText style={{ marginLeft: 5 }}>{distanceToPoint}</CText>
        )}
      </Button>

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
    width: 40,
    height: 40,
    // backgroundColor: CONSTANTS.colors.bg1,
    borderRadius: 50,
  },
});
