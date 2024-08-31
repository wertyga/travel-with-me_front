import { useEffect } from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  size?: number;
  style?: ViewStyle;
};

export const ShowToSlideTop = ({ size = 40, style }: Props) => {
  const aOffset = useSharedValue(0);
  const aOpacity = useSharedValue(1);

  const aStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: aOffset.value }],
    opacity: aOpacity.value,
  }));

  useEffect(() => {
    aOffset.value = withRepeat(withTiming(-size * 2, { duration: 1500 }), -1);
    aOpacity.value = withRepeat(
      withDelay(700, withTiming(0, { duration: 800 })),
      -1
    );
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size,
        },
        aStyles,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    borderWidth: 1,
  },
});
