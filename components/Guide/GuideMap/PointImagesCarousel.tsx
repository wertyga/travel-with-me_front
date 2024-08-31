import { useEffect, useState } from 'react';

import { Dimensions, StyleSheet, View } from 'react-native';

import {
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

import { LinearGradient } from 'expo-linear-gradient';

import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import { CarouselDots } from '@/components/Carousel';
import { ShowToSlideTop } from '@/components/Common';
import { ZoomImage } from '@/components/Common/ZoomImage/ZoomImage';
import { useStores } from '@/hooks';

import { FONTS, Place } from '@/types';

type Props = {
  point: Place;
  onClose: () => void;
  initialIndex?: number;
};

const TRANSLATION_Y_OFFSET = 150;

const { width: windowWidth } = Dimensions.get('window');

export const PointImagesCarouselComponent = ({
  point,
  onClose,
  initialIndex = 0,
}: Props) => {
  const { layoutHeight } = useStores(stores => ({
    layoutHeight: stores.domStore.layoutHeight,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  const swipeTranslateX = useSharedValue(0);
  const swipeTranslateY = useSharedValue(0);
  const swipeTopValue = useSharedValue({
    currentIndex: 0,
  });

  const animatedWrapperStyles = useAnimatedStyle(() => {
    if (Math.abs(swipeTranslateY.value) >= layoutHeight) {
      runOnJS(onClose)();
      return {};
    }

    return {
      transform: [
        {
          translateY: swipeTranslateY.value,
        },
        { translateX: swipeTranslateX.value },
      ],
    } as any;
  });

  const goToIndex = (index: number) => {
    swipeTranslateX.value = index * -windowWidth;
    swipeTopValue.value = {
      ...swipeTopValue.value,
      currentIndex: index,
    };
    setCurrentIndex(index);
  };

  const onUpdate = e => {
    const { translationY, translationX } = e;
    const isByY = Math.abs(translationY) > Math.abs(translationX);
    const { currentIndex } = swipeTopValue.value;
    const currentTranslateX = currentIndex * -windowWidth;

    swipeTranslateX.value = !isByY
      ? currentTranslateX + translationX
      : currentTranslateX;
    swipeTranslateY.value = isByY ? translationY : 0;
  };

  const onFinalize = e => {
    const { translationY, translationX } = e;
    const isByY = Math.abs(translationY) > Math.abs(translationX);
    const { currentIndex } = swipeTopValue.value;
    const currentTranslateX = currentIndex * -windowWidth;

    if (isByY) {
      swipeTranslateX.value = withTiming(currentTranslateX, { duration: 100 });

      // translationY - negative, slide to top
      if (translationY <= -TRANSLATION_Y_OFFSET) {
        swipeTranslateY.value = withTiming(-layoutHeight - 100, {
          duration: 100,
        });
      } else {
        swipeTranslateY.value = withTiming(0, { duration: 100 });
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

      swipeTranslateX.value = withTiming(windowWidth * -index, {
        duration: 100,
      });
      swipeTranslateY.value = withTiming(0, { duration: 100 });
      swipeTopValue.value = { currentIndex: index };

      runOnJS(setCurrentIndex)(index);
    }
  };

  const gesture = Gesture.Pan()
    .onUpdate(onUpdate)
    .onFinalize(onFinalize)
    .maxPointers(1);

  useEffect(() => {
    goToIndex(initialIndex);
  }, [initialIndex]);

  return (
    <View
      style={{
        ...styles.container,
        width: point.images.length * windowWidth,
        height: layoutHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      }}
    >
      <GestureHandlerRootView
        style={[
          {
            height: layoutHeight,
          },
        ]}
      >
        <GestureDetector gesture={gesture}>
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
                <ZoomImage
                  key={image}
                  uri={image}
                  imageStyle={{
                    width: windowWidth,
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              );
            })}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>

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
        <ShowToSlideTop style={styles.showToTop} />

        <CarouselDots
          style={styles.dots}
          totalCount={point.images.length}
          currentIndex={currentIndex}
        />
      </LinearGradient>
    </View>
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
  showToTop: {
    position: 'absolute',
    right: 20,
    bottom: 40,
  },
});

export const PointImagesCarousel = observer(PointImagesCarouselComponent);
