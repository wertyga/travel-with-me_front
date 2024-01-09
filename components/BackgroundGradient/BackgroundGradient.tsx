import React from 'react';
import { ViewStyle, View } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { CONSTANTS } from '@/styles/constants';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const BackgroundGradient = ({ children, style }: Props) => {
  return (
    <LinearGradient
      colors={[CONSTANTS.colors.bg1, CONSTANTS.colors.bg2]}
      start={{ x: 0, y: 0.2 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};
