import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Image } from '@/components/Image';
import { CText } from '@/components/CText';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { FONTS, Place } from '@/types';
import { useLayout } from '@/context';

type Props = {
  point: Place;
  onClose: () => void;
};

const TRANSLATION_Y_OFFSET = 150;

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
export const PointImagesCarousel = ({ point, onClose }: Props) => {
  const { height: windowHeight } = useLayout();
  const swipeTopValue = useSharedValue({
    translateX: 0,
    translateY: 0,
    imageSlide: false,
    currentIndex: 0,
  });

  const animatedWrapperStyles = useAnimatedStyle(() => {
    const translateY = swipeTopValue.value.translateY;
    const translateX = swipeTopValue.value.translateX;

    if (Math.abs(translateY) >= windowHeight) {
      runOnJS(onClose)();
    }

    const valueX = swipeTopValue.value.imageSlide
      ? translateX
      : withTiming(translateX, { duration: 100 });

    return {
      transform: [
        { translateY: withTiming(translateY, { duration: 100 }) },
        { translateX: valueX },
      ],
    };
  });

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      const { translationY, translationX } = e;
      const isByY = Math.abs(translationY) > Math.abs(translationX);
      const { currentIndex } = swipeTopValue.value;
      const currentTranslateX = currentIndex * -windowWidth;

      swipeTopValue.value = {
        ...swipeTopValue.value,
        imageSlide: true,
        translateY: isByY ? translationY : 0,
        translateX: !isByY
          ? currentTranslateX + translationX
          : currentTranslateX,
      };
    })
    .onFinalize(e => {
      const { translationY, translationX } = e;
      const isByY = Math.abs(translationY) > Math.abs(translationX);
      const { currentIndex } = swipeTopValue.value;
      const currentTranslateX = currentIndex * -windowWidth;

      if (isByY) {
        // translationY - negative, slide to top
        if (translationY <= -TRANSLATION_Y_OFFSET) {
          swipeTopValue.value = {
            ...swipeTopValue.value,
            imageSlide: false,
            translateX: currentTranslateX,
            translateY: -windowHeight - 100,
          };
        } else {
          swipeTopValue.value = {
            ...swipeTopValue.value,
            imageSlide: false,
            translateX: currentTranslateX,
            translateY: 0,
          };
        }
      } else {
        const isLeft = translationX <= -30;
        const isRight = translationX >= 30;
        let index = currentIndex;

        if (isLeft) {
          index =
            currentIndex + 1 > point.images.length - 1
              ? point.images.length - 1
              : currentIndex + 1;
        } else if (isRight) {
          index = currentIndex - 1 < 0 ? 0 : currentIndex - 1;
        }

        swipeTopValue.value = {
          currentIndex: index,
          imageSlide: false,
          translateY: 0,
          translateX: windowWidth * -index,
        };
      }
    });

  return (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, animatedWrapperStyles]}>
          {point.images.map(image => {
            return (
              <Image
                source={{ uri: image }}
                key={image}
                style={{ width: windowWidth, height: windowHeight }}
              />
            );
          })}
        </Animated.View>
      </GestureDetector>
      <CText style={styles.title}>{point.title}</CText>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: windowHeight,
    top: 0,
    left: 0,
    zIndex: 10,
    flexDirection: 'row',
  },
  title: {
    zIndex: 25,
    position: 'absolute',
    top: 40,
    left: 10,
    flex: 1,
    width: Dimensions.get('window').width - 20,
    textAlign: 'center',
    fontSize: 25,
    fontFamily: FONTS.CrimsonBold,
  },
});
