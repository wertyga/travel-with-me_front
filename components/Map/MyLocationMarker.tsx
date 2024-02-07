import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { CONSTANTS } from '@/styles/constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { Path } from '@/types';

type Props = {
  liveCoords: Path;
};

export const MyLocationMarker = ({ liveCoords }: Props) => {
  return (
    <Marker
      coordinate={{
        latitude: liveCoords.lat,
        longitude: liveCoords.lng,
      }}
    >
      <View style={styles.icon}>
        <FontAwesome5 name="walking" size={18} color="white" />
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: CONSTANTS.colors.bg1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
