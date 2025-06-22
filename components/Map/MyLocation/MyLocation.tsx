import React, { FC } from 'react';

import {
  MyLocationBtn,
  TMyLocationBtnProps,
} from '@/components/Map/MyLocation/MyLocationBtn';
import {
  MyLocationMarker,
  TMyLocationMarkerProps,
} from '@/components/Map/MyLocation/MyLocationMarker';

export type TMyLocationProps = TMyLocationBtnProps &
  TMyLocationMarkerProps & {};

export const MyLocation: FC<TMyLocationProps> = ({
  onPress,
  style: btnStyle,
}) => {
  return (
    <>
      <MyLocationBtn onPress={onPress} style={btnStyle} />
      <MyLocationMarker />
    </>
  );
};
