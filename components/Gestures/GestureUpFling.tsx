import React, { useState } from 'react';

import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';

import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type GestureUpFlingProps = {
  initialHeight: number;
  maxTop?: number;
  zIndex?: number;
  children: (
    Trigger: React.FC<{ style: ViewStyle; children?: React.ReactNode }>,
    isOpened: boolean
  ) => React.ReactNode;
  onOpen?: (isOpened: boolean) => void;
  style?: ViewStyle;
};

export const GestureUpFling: React.FC<GestureUpFlingProps> = ({
  children,
  initialHeight = 200,
  maxTop = 50,
  onOpen,
  style,
  zIndex,
}) => {
  const { height: windowHeight } = Dimensions.get('window');
  const openedTopValue = windowHeight - initialHeight;

  const [stateIsOpened, setStateIsOpened] = useState(false);

  const isOpened = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => {
    if (!isOpened.value) {
      return {
        top: withTiming(openedTopValue, {
          duration: 150,
        }),
      };
    }

    return {
      top: withTiming(maxTop, {
        duration: 150,
      }),
    };
  });

  const handleClose = () => {
    isOpened.value = false;

    setTimeout(() => {
      setStateIsOpened(false);
      onOpen?.(false);
    });
  };

  const handleOpen = () => {
    isOpened.value = true;

    setTimeout(() => {
      setStateIsOpened(true);
      onOpen?.(true);
    });
  };

  const gesture = Gesture.Fling()
    .direction(Directions.UP | Directions.DOWN)
    .onEnd(() => {
      if (isOpened.value) {
        runOnJS(handleClose)();
      } else {
        runOnJS(handleOpen)();
      }
    });

  const Trigger: React.FC<{
    style?: ViewStyle;
    children?: React.ReactNode;
  }> = ({ style = {}, children }) => (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <View style={[styles.triggerWrapper, style]}>
          <View style={styles.trigger} />

          {children}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          animatedStyles,
          style,
          {
            zIndex,
          },
        ]}
      >
        {children(Trigger, stateIsOpened)}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  triggerWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  trigger: {
    height: 6,
    backgroundColor: 'white',
    borderRadius: 4,
    width: 150,
  },
});
