import * as React from 'react';

import { StyleSheet } from 'react-native';

import { FontAwesome6 } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { useStores } from '@/hooks';

import { getNearestPoint } from '@/utils/map';

import { Guide, Place } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  guide: Guide;
  onPointChoose: (point: Place, force?: boolean) => void;
};

export const GuideMapGoToNearestPointBtnComponent = ({
  guide,
  onPointChoose,
}: Props) => {
  const { liveCoords } = useStores(stores => ({
    liveCoords: stores.locationStore.liveCoords,
  }));

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
      squareSize={40}
      rounded
    >
      <FontAwesome6 name="person-walking-arrow-right" size={18} color="white" />
    </Button>
  );
};

const styles = StyleSheet.create({
  closestBtn: {
    backgroundColor: CONSTANTS.colors.bg1,
    // position: 'absolute',
    // bottom: 10,
    // right: 55,
    // width: 40,
    // height: 40,
    // borderRadius: 60,
  },
});

export const GuideMapGoToNearestPointBtn = observer(
  GuideMapGoToNearestPointBtnComponent
);
