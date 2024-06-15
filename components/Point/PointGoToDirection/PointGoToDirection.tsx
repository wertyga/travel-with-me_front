import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import Button, { CustomButtonProps } from '@/components/Button';
import { CText } from '@/components/CText';
import { openGoogleMap } from '@/components/Map/Map.utils';
import { useStores } from '@/hooks';
import { showNotification } from '@/utils';
import { calculateDistance } from '@/utils/map';
import { Place } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  style?: CustomButtonProps['style'];
  onPress?: (point: Place) => void;
  point: Place;
};

const PointGoToDirection = ({ style, onPress, point }: Props) => {
  const { liveCoords } = useStores(stores => ({
    liveCoords: stores.locationStore.liveCoords,
  }));

  const onDirectionPress = async () => {
    if (onPress) {
      await onPress(point);
    }

    await showNotification({
      content: {
        title: point.title,
        color: CONSTANTS.colors.bg1,
      },
    });

    openGoogleMap(point.coords);
  };

  const distanceToPoint = calculateDistance(point.coords, liveCoords);
  const stylesArrayed = Array.isArray(style) ? style : [style];

  return (
    // @ts-ignore
    <Button
      style={[
        styles.container,
        !!distanceToPoint && { width: undefined },
        ...stylesArrayed,
      ]}
      noPaddings={!distanceToPoint}
      onPress={onDirectionPress}
    >
      <MaterialIcons name="directions" size={24} color="white" />
      {!!distanceToPoint && (
        <CText style={{ marginLeft: 5 }}>{distanceToPoint}</CText>
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
