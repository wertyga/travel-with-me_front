import React, { useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { CText } from '@/components/CText';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { FONTS } from '@/types';
import { useLayout } from '@/context';

const UPPER_CONTENT_HEIGHT = 300;
const MIN_BOTTOM = 380;
const ONE_PERCENT = Math.abs(MIN_BOTTOM) / 100;

type Props = {
  TopContent?: React.ReactNode;
  BottomContent?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  wrapperHeight: number;
};

const { width: windowWidth } = Dimensions.get('window');

export const EntityMeta = ({
  TopContent,
  description,
  BottomContent,
  disabled,
  wrapperHeight,
}: Props) => {
  const [opened, setOpened] = useState(false);
  const { height: windowHeight } = useLayout();

  const refState = useRef({
    initialState: {
      translateY: 0,
      top: windowHeight - UPPER_CONTENT_HEIGHT,
      opacity: 0,
      zIndex: 0,
      opened: false,
    },
    openedState: {
      translateY: 0,
      top: windowHeight - wrapperHeight,
      opacity: 1,
      zIndex: 2000,
      opened: true,
    },
  });
  const swipeValues = useSharedValue(refState.current.initialState);

  const animatedWrapperStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: swipeValues.value.translateY }],
      top: swipeValues.value.top,
      zIndex: swipeValues.value.zIndex,
    };
  });
  const animatedHidedPartStyles = useAnimatedStyle(() => {
    return {
      opacity: swipeValues.value.opacity,
    };
  });

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      if (disabled) return;

      const { translationY } = e;
      const differencePercentY = Math.round(
        Math.abs(translationY) / ONE_PERCENT
      );

      swipeValues.value = {
        ...swipeValues.value,
        translateY: translationY,
        opacity: translationY > 0 ? 1 : differencePercentY / 100,
      };
    })
    .onFinalize(e => {
      if (disabled) return;

      const { translationY } = e;

      const wasSwipeUpAndShouldBeOpened = translationY < -30;
      const wasSwipeDownAndShouldBeClosed = translationY > 30;

      if (wasSwipeUpAndShouldBeOpened) {
        swipeValues.value = refState.current.openedState;
        runOnJS(setOpened)(true);
      } else if (wasSwipeDownAndShouldBeClosed) {
        swipeValues.value = refState.current.initialState;
        runOnJS(setOpened)(false);
      } else if (swipeValues.value.opened) {
        swipeValues.value = refState.current.openedState;
      } else {
        swipeValues.value = refState.current.initialState;
      }
    });

  return (
    <Animated.View
      style={[
        styles.metaWrapper,
        animatedWrapperStyles,
        {
          height: wrapperHeight,
        },
      ]}
    >
      <BackgroundGradient style={styles.container}>
        <View style={{ flexGrow: 1 }}>
          <GestureDetector gesture={gesture}>
            <View style={styles.meta}>
              {!disabled && (
                <View style={styles.swiperWrapper}>
                  <View style={styles.swiper} />
                </View>
              )}
              {TopContent}
            </View>
          </GestureDetector>

          {!!description && (
            <ScrollView style={styles.scrollDescription}>
              <CText
                style={styles.description}
                numberOfLines={opened ? undefined : 5}
              >
                {description}
              </CText>
            </ScrollView>
          )}
        </View>

        {!!BottomContent && (
          <Animated.View style={[animatedHidedPartStyles]}>
            {BottomContent}
          </Animated.View>
        )}
      </BackgroundGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  metaWrapper: {
    position: 'absolute',
    left: 0,
    width: windowWidth,
  },
  container: {
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 20,
  },
  scrollDescription: {
    position: 'relative',
    flexGrow: 1,
    flex: 1,
  },
  description: {
    lineHeight: 22,
    color: 'white',
    fontFamily: FONTS.OpenSans,
  },
  meta: {
    paddingTop: 10,
  },
  swiperWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  swiper: {
    width: 100,
    height: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
