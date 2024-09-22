import React from 'react';

import { StyleSheet, ViewStyle } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { useStores } from '@/hooks';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  onGetMyLocationClick: () => void;
  showMyLocationBtnStyle?: ViewStyle;
};

export const ShowMyLocation = observer(
  ({ onGetMyLocationClick, showMyLocationBtnStyle }: Props) => {
    const { liveCoords } = useStores(stores => ({
      liveCoords: stores.locationStore.liveCoords,
    }));

    if (!liveCoords) return null;

    return (
      <Button
        style={[styles.showMyLocationBtn, showMyLocationBtnStyle]}
        onPress={onGetMyLocationClick}
        noPaddings
        squareSize={40}
        rounded
      >
        <MaterialIcons name="location-searching" size={20} color="white" />
      </Button>
    );
  }
);

const styles = StyleSheet.create({
  showMyLocationBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: CONSTANTS.colors.bgLight,
  },
});
