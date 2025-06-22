import React, { FC } from 'react';

import { StyleSheet, View } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import { useStores } from '@/hooks';
import Mapbox from '@rnmapbox/maps';

import { CONSTANTS } from '@/styles/constants';

export type TMyLocationMarkerProps = {};

export const MyLocationMarker: FC<TMyLocationMarkerProps> = observer(() => {
  const { liveCoords } = useStores(stores => ({
    liveCoords: stores.locationStore.liveCoords,
  }));

  if (!liveCoords) return null;

  return (
    <Mapbox.MarkerView
      coordinate={[liveCoords.lng, liveCoords.lat]}
      id="my-location"
    >
      <View style={styles.icon}>
        <FontAwesome5
          name="walking"
          size={18}
          color={CONSTANTS.colors.typographyLight}
        />
      </View>
    </Mapbox.MarkerView>
  );
});

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: CONSTANTS.colors.bgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
