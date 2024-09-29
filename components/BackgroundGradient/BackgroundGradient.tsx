import React from 'react';

import { ViewProps } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { CONSTANTS } from '@/styles/constants';

type Props = ViewProps & {
  colors?: string[];
};

export const BackgroundGradient = ({
  children,
  style,
  colors = [CONSTANTS.colors.bgDark2, CONSTANTS.colors.bgDark],
  ...restProps
}: Props) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0.2 }}
      style={style}
      {...restProps}
    >
      {children}
    </LinearGradient>
  );
};
