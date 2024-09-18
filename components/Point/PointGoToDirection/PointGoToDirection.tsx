import React, { useEffect } from 'react';

import { StyleSheet } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { CustomButtonProps } from '@/components/Button/BaseButton';
import { CText } from '@/components/CText';
import { gotoPointDirection } from '@/components/Point/PointGoToDirection/PointGoToDirection.utils';
import { useStores } from '@/hooks';

import { calculateDistance } from '@/utils/map';

import { Place } from '@/types';

type Props = {
  style?: CustomButtonProps['style'];
  onPress?: (point: Place) => void;
  point: Place;
};

const PointGoToDirection = ({ style = {}, onPress, point }: Props) => {
  const { liveCoords, isWatching } = useStores(stores => ({
    liveCoords: stores.locationStore.liveCoords,
    isWatching: stores.locationStore.isWatching,
  }));

  const onDirectionPress = async () => {
    if (onPress) {
      await onPress(point);
    }

    await gotoPointDirection(point);
  };

  const distanceToPoint = calculateDistance(point.coords, liveCoords);
  const stylesArrayed = Array.isArray(style) ? style : [style];

  return (
    // @ts-ignore
    <Button
      style={[styles.container, ...stylesArrayed]}
      squareSize={!distanceToPoint && 40}
      free={!!distanceToPoint}
      noPaddings={!distanceToPoint}
      onPress={onDirectionPress}
    >
      <MaterialIcons name="directions" size={24} color="white" />
      {!!distanceToPoint && (
        <CText style={{ marginLeft: 5 }} light>
          {distanceToPoint}
        </CText>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default observer(PointGoToDirection);
