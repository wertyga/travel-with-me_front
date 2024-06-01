import React from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: string[];
};

export const BackgroundGradient = ({
  children,
  style,
  colors = [CONSTANTS.colors.bg4, CONSTANTS.colors.bg3],
}: Props) => {
  return (
    <LinearGradient colors={colors} start={{ x: 0, y: 0.2 }} style={style}>
      {children}
    </LinearGradient>
  );
};
