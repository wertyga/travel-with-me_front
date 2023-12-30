import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { View } from 'react-nativewind';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import { CONSTANTS } from '@/styles/constants';
import cn from '@/app/classname';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export const MainLayout = ({ children, style, containerStyle }: Props) => {
  return (
    <SafeAreaView style={cn(containerStyle)}>
      <LinearGradient
        colors={[CONSTANTS.colors.bg1, CONSTANTS.colors.bg2]}
        start={{ x: 0, y: 0.3 }}
      >
        <View style={cn(styles.container, style)}>{children}</View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 15,
    position: 'relative',
  },
});
