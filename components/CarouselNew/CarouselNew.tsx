import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';
import { GesturesContainer } from '@/components/Gestures/Gestures';
import { State as GestureState } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props<T = any> = {
  data: T[];
  renderItem: (data: { item: T; index: number }) => React.ReactNode;
  onChange: (data: { index: number; item: T }) => void;
  defaultIndex?: number;
  sliderRef?: React.MutableRefObject<any>;
};

export const CarouselNew = <T,>({
  data,
  renderItem,
  onChange,
  defaultIndex = 0,
  sliderRef,
}: Props<T>) => {
  const swipeTopValue = useSharedValue({
    translateX: 0,
    currentIndex: 0,
    isFinished: false,
    windowWidth: Dimensions.get('window').width,
  });

  const slideByIndex = (index: number, isFinished = true) => {
    const currentIndex = swipeTopValue.value.currentIndex;
    swipeTopValue.value = {
      ...swipeTopValue.value,
      currentIndex: index,
      translateX: swipeTopValue.value.windowWidth * -index,
      isFinished,
    };

    if (currentIndex !== index) {
      setTimeout(() => {
        onChange({ index, item: data[index] });
      });
    }
  };

  const animatedWrapperStyles = useAnimatedStyle(() => {
    const { translateX, isFinished } = swipeTopValue.value;

    const valueX = isFinished
      ? withTiming(translateX, { duration: 100 })
      : translateX;

    return {
      transform: [{ translateX: valueX }],
    } as any;
  });

  const onUpdate = e => {
    const { translationX, translationY, state } = e;

    const isSlidingByY = Math.abs(translationY) > Math.abs(translationX);
    if (state !== GestureState.ACTIVE || isSlidingByY) {
      return;
    }

    const { currentIndex, windowWidth } = swipeTopValue.value;
    const currentTranslateX = currentIndex * -windowWidth;
    const isBlockedLast = currentIndex === data.length - 1 && translationX < 0;
    const isBlockedByFirst = currentIndex === 0 && translationX > 0;

    if (isBlockedLast || isBlockedByFirst) {
      return;
    }

    swipeTopValue.value = {
      ...swipeTopValue.value,
      translateX: currentTranslateX + translationX,
      isFinished: false,
    };
  };

  const onFinalize = e => {
    const { translationX, state } = e;
    if (state !== GestureState.END) return;

    const { currentIndex, windowWidth } = swipeTopValue.value;
    const scrollOffset = windowWidth / 3;

    const shouldSlideLeft = translationX <= -scrollOffset;
    const shouldSlideRight = translationX >= scrollOffset;
    let index = currentIndex;

    if (shouldSlideLeft) {
      index =
        currentIndex + 1 > data.length - 1 ? data.length - 1 : currentIndex + 1;
    } else if (shouldSlideRight) {
      index = currentIndex - 1 < 0 ? 0 : currentIndex - 1;
    }

    runOnJS(slideByIndex)(index);
  };

  useEffect(() => {
    slideByIndex(defaultIndex || 0, false);
  }, [defaultIndex]);

  useEffect(() => {
    if (sliderRef) {
      sliderRef.current = {
        slideByIndex,
      };
    }
  }, []);

  return (
    <GesturesContainer onUpdate={onUpdate} onFinalize={onFinalize}>
      <Animated.View style={[styles.container, animatedWrapperStyles]}>
        {data.map((info, i) =>
          renderItem({
            item: info,
            index: i,
          })
        )}
      </Animated.View>
    </GesturesContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
});
