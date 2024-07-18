import React, { useRef, useState } from 'react';

import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { GesturesContainer } from './Gestures';

const FCKING_TRANSITION_LAG = 20;

export type GestureUpProps = {
  initialHeight: number;
  maxTop?: number;
  activateThreshold?: number;
  children: (
    Trigger: React.FC<{ style: ViewStyle; children?: React.ReactNode }>
  ) => React.ReactNode;
  onOpen?: (isOpened: boolean) => void;
};

export const GestureUp: React.FC<GestureUpProps> = ({
  children,
  initialHeight = 200,
  maxTop = 50,
  activateThreshold = 50,
  onOpen,
}) => {
  const currentStateRef = useRef({
    initialTop: Dimensions.get('window').height - initialHeight,
    currentTop: Dimensions.get('window').height - initialHeight,
  });

  const swipeTop = useSharedValue(currentStateRef.current.currentTop);
  const isOpened = useSharedValue(false);
  const canBeActivate = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: swipeTop.value,
    };
  });

  const handleClose = () => {
    swipeTop.value = withTiming(currentStateRef.current.initialTop, {
      duration: 150,
    });
    isOpened.value = false;
    setTimeout(() => {
      onOpen?.(false);
    });
  };

  const handleOpen = () => {
    swipeTop.value = withTiming(maxTop, {
      duration: 150,
    });
    isOpened.value = true;
    setTimeout(() => {
      onOpen?.(true);
    });
  };

  const onUpdate = e => {
    const distance = e.absoluteY + FCKING_TRANSITION_LAG;
    swipeTop.value = distance;

    const activation = isOpened.value
      ? distance - maxTop
      : currentStateRef.current.initialTop - distance;

    canBeActivate.value = activation > activateThreshold;
  };

  const onEnd = () => {
    if (!canBeActivate.value) {
      swipeTop.value = isOpened.value
        ? maxTop
        : currentStateRef.current.initialTop;
      return;
    }

    if (isOpened.value) {
      runOnJS(handleClose)();
    } else {
      runOnJS(handleOpen)();
    }
  };

  const onStart = () => {};

  const Trigger: React.FC<{ style: ViewStyle; children?: React.ReactNode }> = ({
    style = {},
    children,
  }) => (
    <GesturesContainer onUpdate={onUpdate} onEnd={onEnd} onStart={onStart}>
      <View style={[styles.triggerWrapper, style]}>
        <View style={styles.trigger} />
        {children}
      </View>
    </GesturesContainer>
  );

  return (
    <>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 10,
          },
          animatedStyles,
        ]}
      >
        {children(Trigger)}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
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
