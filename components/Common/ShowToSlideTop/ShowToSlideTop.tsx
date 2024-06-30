import { useEffect } from 'react';

import { StyleSheet, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const ShowToSlideTop = () => {
  const aOffset = useSharedValue(0);
  const aOpacity = useSharedValue(1);

  const aStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: aOffset.value }],
    opacity: aOpacity.value,
  }));

  useEffect(() => {
    aOffset.value = withRepeat(withTiming(-80, { duration: 1500 }), -1);
    aOpacity.value = withRepeat(
      withDelay(700, withTiming(0, { duration: 800 })),
      -1
    );
  }, []);

  return <Animated.View style={[styles.container, aStyles]}></Animated.View>;
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 1,
  },
});
