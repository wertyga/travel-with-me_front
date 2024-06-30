import { useCallback, useState } from 'react';

import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useAnimationRotate = (
  value: number,
  options: { duration: number } = { duration: 150 }
) => {
  const rotate = useSharedValue(value);

  const styles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  });

  const update = useCallback(
    (newValue: number) => {
      rotate.value = withTiming(newValue, { duration: options.duration });
    },
    [options]
  );

  return {
    styles,
    update,
  };
};
