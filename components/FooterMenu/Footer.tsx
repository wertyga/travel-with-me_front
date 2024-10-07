import React, { useEffect } from 'react';

import { Platform, StyleSheet, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { observer } from 'mobx-react-lite';

import { useStores } from '@/hooks';

import { CONSTANTS } from '@/styles/constants';

import { FooterMenu } from './FooterMenu';

export const Footer = observer(() => {
  const { footer } = useStores(stores => ({
    footer: stores.domStore.footer,
  }));

  const translateY = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    } as any;
  });

  useEffect(() => {
    translateY.value = withTiming(footer.hidden ? 100 : 0);
  }, [footer.hidden]);

  return (
    <Animated.View
      style={[
        {
          paddingBottom:
            Platform.OS === 'ios'
              ? CONSTANTS.spaces.iosAdditionalSpaceBottom
              : 0,
        },
        animatedStyles,
      ]}
    >
      <FooterMenu />
      <View style={styles.bottomPlaceholder} />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  bottomPlaceholder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: CONSTANTS.colors.footerColor,
    zIndex: CONSTANTS.indexes.footerZIndex - 1,
    height: CONSTANTS.spaces.footerHeight,
  },
});
