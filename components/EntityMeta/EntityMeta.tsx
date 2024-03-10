import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { updateDomAction, useSelector } from '@/stores';
import { useFocusEffect } from '@react-navigation/native';

const UPPER_CONTENT_HEIGHT = 300;
const MIN_BOTTOM = 380;
const ONE_PERCENT = Math.abs(MIN_BOTTOM) / 100;

type Props = {
  TopContent?: React.ReactNode;
  BottomContent?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  withHeaderHide?: boolean;
  wrapperHeight: number;
  collapsedHeight?: number;
  underTopContentSlot?: React.ReactNode;
};

const { width: windowWidth } = Dimensions.get('window');

export const EntityMeta = ({
  TopContent,
  description,
  BottomContent,
  disabled,
  withHeaderHide,
  wrapperHeight,
  underTopContentSlot,
  collapsedHeight = UPPER_CONTENT_HEIGHT,
}: Props) => {
  const [opened, setOpened] = useState(false);
  const windowHeight = useSelector(({ domStore }) => domStore?.layout?.height);

  const refState = useRef({
    initialState: {
      translateY: 0,
      top: windowHeight - collapsedHeight,
      opacity: 0,
      opened: false,
    },
    openedState: {
      translateY: 0,
      top: windowHeight - wrapperHeight,
      opacity: 1,
      opened: true,
    },
  });
  const swipeValues = useSharedValue(refState.current.initialState);

  const animatedWrapperStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: swipeValues.value.translateY }],
      top: swipeValues.value.top,
    } as any;
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
      const opacity = translationY > 0 ? 1 : differencePercentY / 100;

      swipeValues.value = {
        ...swipeValues.value,
        translateY: translationY,
        opacity,
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

  useEffect(() => {
    if (opened) {
      updateDomAction({
        footer: { hidden: true },
        header: withHeaderHide ? { hidden: true } : {},
      });
    } else {
      updateDomAction({
        footer: { hidden: false },
        header: { hidden: false },
      });
    }
  }, [opened]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        swipeValues.value = refState.current.initialState;
        setOpened(false);
      };
    }, [])
  );

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
      {/*<View style={styles.container}>*/}
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

          {underTopContentSlot}

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
    //
    // backgroundColor: CONSTANTS.colors.bg3,
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
