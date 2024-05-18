import React from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const BackgroundGradient = ({ children, style }: Props) => {
  return (
    <LinearGradient
      colors={[CONSTANTS.colors.bg4, CONSTANTS.colors.bg3]}
      start={{ x: 0, y: 0.2 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};
