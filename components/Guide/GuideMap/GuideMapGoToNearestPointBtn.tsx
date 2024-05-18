import * as React from 'react';
import { StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { useSelector } from '@/stores';
import { FontAwesome6 } from '@expo/vector-icons';
import { getNearestPoint } from '@/utils/map';
import { Guide, Place } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  guide: Guide;
  onPointChoose: (point: Place, force?: boolean) => void;
};

export const GuideMapGoToNearestPointBtn = ({
  guide,
  onPointChoose,
}: Props) => {
  const liveCoords = useSelector(
    ({ locationStore }) => locationStore?.liveCoords
  );

  const chooseNearestPoint = () => {
    if (!liveCoords) return;

    const nearestPoint = getNearestPoint(guide.points, liveCoords);
    if (!nearestPoint) return;

    onPointChoose(nearestPoint, true);
  };

  if (!liveCoords) {
    return null;
  }

  return (
    <Button
      style={styles.closestBtn}
      noPaddings
      rectangle
      onPress={chooseNearestPoint}
    >
      <FontAwesome6 name="person-walking-arrow-right" size={18} color="white" />
    </Button>
  );
};

const styles = StyleSheet.create({
  closestBtn: {
    backgroundColor: CONSTANTS.colors.bg1,
    position: 'absolute',
    bottom: 10,
    right: 55,
    width: 40,
    height: 40,
    borderRadius: 60,
  },
});
