import { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { CarouselDots } from '@/components/Carousel';
import { GesturesContainer } from '@/components/Gestures/Gestures';
import { useStores } from '@/hooks';
import { observer } from 'mobx-react';
import { FONTS, Place } from '@/types';

type Props = {
  point: Place;
  onClose: () => void;
};

const TRANSLATION_Y_OFFSET = 150;

const { width: windowWidth } = Dimensions.get('window');
export const PointImagesCarouselComponent = ({ point, onClose }: Props) => {
  const { layoutHeight } = useStores(stores => ({
    layoutHeight: stores.domStore.layoutHeight,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const swipeTopValue = useSharedValue({
    translateX: 0,
    translateY: 0,
    imageSlide: false,
    currentIndex: 0,
    isFinished: false,
  });

  const animatedWrapperStyles = useAnimatedStyle(() => {
    const { translateY, translateX, imageSlide, isFinished } =
      swipeTopValue.value;

    if (Math.abs(translateY) >= layoutHeight) {
      runOnJS(onClose)();
    }

    const valueX = imageSlide
      ? translateX
      : withTiming(translateX, { duration: 100 });

    return {
      transform: [
        {
          translateY: isFinished
            ? withTiming(translateY, { duration: 100 })
            : translateY,
        },
        { translateX: valueX },
      ],
    } as any;
  });

  const onUpdate = e => {
    const { translationY, translationX } = e;
    const isByY = Math.abs(translationY) > Math.abs(translationX);
    const { currentIndex } = swipeTopValue.value;
    const currentTranslateX = currentIndex * -windowWidth;

    swipeTopValue.value = {
      ...swipeTopValue.value,
      imageSlide: true,
      translateY: isByY ? translationY : 0,
      translateX: !isByY ? currentTranslateX + translationX : currentTranslateX,
      isFinished: false,
    };
  };

  const onFinalize = e => {
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
          translateY: -layoutHeight - 100,
          isFinished: true,
        };
      } else {
        swipeTopValue.value = {
          ...swipeTopValue.value,
          imageSlide: false,
          translateX: currentTranslateX,
          translateY: 0,
          isFinished: true,
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
        isFinished: true,
      };
      runOnJS(setCurrentIndex)(index);
    }
  };

  return (
    <BackgroundGradient
      style={{
        ...styles.container,
        width: point.images.length * windowWidth,
        height: layoutHeight,
      }}
    >
      <GesturesContainer
        onFinalize={onFinalize}
        onUpdate={onUpdate}
        style={[
          {
            height: layoutHeight,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.gallery,
            {
              height: layoutHeight,
              width: point.images.length * windowWidth,
            },
            animatedWrapperStyles,
          ]}
        >
          {point.images.map(image => {
            return (
              <Image
                key={image}
                source={{ uri: image }}
                style={{
                  width: windowWidth,
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            );
          })}
        </Animated.View>
      </GesturesContainer>

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
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 200,
    ...StyleSheet.absoluteFillObject,
  },
  gallery: {
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
    width: Dimensions.get('window').width,
  },
  scrollToCloseBtn: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 50,
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent',
  },
  dots: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: Dimensions.get('window').width,
  },
});

export const PointImagesCarousel = observer(PointImagesCarouselComponent);
