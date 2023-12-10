import React, { CSSProperties } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { View } from 'react-nativewind';

type Props = {
  children: React.ReactNode;
  style?: CSSProperties;
};

export const MainLayout = ({ children, style = {} }: Props) => {
  return (
    <SafeAreaView>
      <View style={{ ...styles.container, ...style }}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
  },
});
