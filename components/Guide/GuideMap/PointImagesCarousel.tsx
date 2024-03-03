import { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from '@/components/Image';
import { CText } from '@/components/CText';
import Button from '@/components/Button';
import { CarouselDots } from '@/components/Carousel';
import { AntDesign } from '@expo/vector-icons';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { FONTS, Place } from '@/types';
import { useSelector } from '@/stores';

type Props = {
  point: Place;
  onClose: () => void;
};

const TRANSLATION_Y_OFFSET = 150;

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
export const PointImagesCarousel = ({ point, onClose }: Props) => {
  const windowHeight = useSelector(({ domStore }) => domStore?.layout?.height);
  const [currentIndex, setCurrentIndex] = useState(0);
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
        runOnJS(setCurrentIndex)(index);
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

      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
        style={styles.titleGradient}
      >
        <CText style={styles.title}>{point.title}</CText>
      </LinearGradient>

      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
        style={styles.actionsContainer}
      >
        <Button style={styles.scrollToCloseBtn} onPress={onClose} noPaddings>
          <AntDesign name="up" size={24} color="white" />
        </Button>
        <CarouselDots
          style={styles.dots}
          totalCount={point.images.length}
          currentIndex={currentIndex}
        />
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: { zIndex: 20000 },
  container: {
    position: 'absolute',
    height: windowHeight,
    top: 0,
    left: 0,
    zIndex: 200,
    flexDirection: 'row',
  },
  titleGradient: {
    zIndex: 200,
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
    textAlign: 'center',
    fontSize: 25,
    fontFamily: FONTS.CrimsonBold,
  },
  actionsContainer: {
    position: 'absolute',
    zIndex: 10000,
    right: 0,
    left: 0,
    bottom: 0,
    height: 70,
  },
  scrollToCloseBtn: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 50,
    bottom: 20,
    right: 20,
  },
  dots: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: Dimensions.get('window').width,
  },
});
