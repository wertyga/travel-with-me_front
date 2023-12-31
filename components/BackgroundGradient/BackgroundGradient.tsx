import { CONSTANTS } from '@/styles/constants';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const BackgroundGradient = ({ children, style }: Props) => {
  return (
    <LinearGradient
      colors={[CONSTANTS.colors.bg1, CONSTANTS.colors.bg2]}
      start={{ x: 0, y: 0.3 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};
