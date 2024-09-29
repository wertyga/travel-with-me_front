import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Marker } from 'react-native-maps';

import { FontAwesome5 } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import { useStores } from '@/hooks';

import { CONSTANTS } from '@/styles/constants';

export const MyLocationMarker = observer(() => {
  const { liveCoords } = useStores(stores => ({
    liveCoords: stores.locationStore.liveCoords,
  }));

  if (!liveCoords) return null;

  return (
    <Marker
      coordinate={{
        latitude: liveCoords.lat,
        longitude: liveCoords.lng,
      }}
    >
      <View style={styles.icon}>
        <FontAwesome5
          name="walking"
          size={18}
          color={CONSTANTS.colors.typographyLight}
        />
      </View>
    </Marker>
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
