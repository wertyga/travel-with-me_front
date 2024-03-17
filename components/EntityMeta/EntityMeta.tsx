import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import { CText } from '@/components/CText';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { FONTS } from '@/types';
import { updateDomAction, useSelector } from '@/stores';
import { useFocusEffect } from '@react-navigation/native';
import { GesturesContainer } from '@/components/Gestures/Gestures';

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
  descriptionTextCutLines?: number;
  underTopContentSlot?: React.ReactNode;
  onOpenStateChange?: (state: boolean) => void;
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
  onOpenStateChange,
  descriptionTextCutLines = 5,
}: Props) => {
  const [opened, setOpened] = useState(false);
  const layoutHeight = useSelector(({ domStore }) => domStore?.layout?.height);

  const refState = useRef({
    initialState: {
      top: layoutHeight - collapsedHeight,
      opacity: 0,
      opened: false,
    },
    openedState: {
      top: layoutHeight - wrapperHeight,
      opacity: 1,
      opened: true,
    },
  });
  const swipeValues = useSharedValue(refState.current.initialState);

  const animatedWrapperStyles = useAnimatedStyle<any>(() => {
    return {
      top: swipeValues.value.top,
    };
  });
  const animatedHidedPartStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(swipeValues.value.opacity),
      display: swipeValues.value.opacity === 0 ? 'none' : 'flex',
    };
  });

  const onUpdate = e => {
    if (disabled) return;

    const { translationY, absoluteY } = e;

    const differencePercentY = Math.round(Math.abs(translationY) / ONE_PERCENT);
    const opacity = translationY > 0 ? 1 : differencePercentY / 100;

    swipeValues.value = {
      ...swipeValues.value,
      top: absoluteY,
      opacity,
    };
  };

  const onFinalize = e => {
    if (disabled) return;

    const { absoluteY } = e;
    const difference = !opened
      ? refState.current.initialState.top - absoluteY
      : absoluteY - refState.current.openedState.top;

    const wasSwipeUpAndShouldBeOpened = !opened && difference > 30;
    const wasSwipeDownAndShouldBeClosed = opened && difference > 30;

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
  };

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

    onOpenStateChange?.(opened);
  }, [opened]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        swipeValues.value = refState.current.initialState;
        setOpened(false);
        updateDomAction({
          footer: { hidden: false },
          header: { hidden: false },
        });
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
      <BackgroundGradient style={styles.container}>
        <View style={{ flexGrow: 1 }}>
          <View style={styles.meta}>
            {!disabled && (
              <GesturesContainer onUpdate={onUpdate} onFinalize={onFinalize}>
                <View style={styles.swiperWrapper}>
                  <View style={styles.swiper} />
                </View>
              </GesturesContainer>
            )}
            {TopContent}
          </View>

          {underTopContentSlot}

          {!!description && (
            <ScrollView style={styles.scrollDescription}>
              <CText
                style={styles.description}
                numberOfLines={opened ? undefined : descriptionTextCutLines}
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
    paddingBottom: 10,
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
  meta: {},
  swiperWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  swiper: {
    width: 100,
    height: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
