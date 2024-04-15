import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Dimensions,
} from 'react-native';
import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { CarouselDots } from '@/components/Carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from '@/stores';

type Props<T = any> = {
  data: T[];
  renderItem: (data: { item: T; index: number }) => React.ReactNode;
  onChange?: (data: { index: number; item: T }) => void;
  defaultIndex?: number;
  cardWidth?: number;
  noDots?: boolean;
  isFullScreen?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const CarouselNew = <T,>({
  data,
  renderItem,
  cardWidth,
  noDots,
  style,
  onChange,
  defaultIndex = 0,
  isFullScreen,
}: Props<T>) => {
  const scrollRef = useRef<Animated.ScrollView>();
  const currentIndexShared = useSharedValue(defaultIndex);
  const isDefaultIndexChanged = useSharedValue(false);
  const [currentIndex, setCurrentIndex] = useState(defaultIndex as number);

  const { width: windowWidth } = Dimensions.get('window');
  const currentCardWith = isFullScreen ? windowWidth : cardWidth;

  const layoutHeight = useSelector(({ domStore }) => domStore?.layout?.height);

  const slideToIndex = (index: number) => {
    currentIndexShared.value = index;
    isDefaultIndexChanged.value = false;
    setCurrentIndex(index);

    onChange?.({ index, item: data[index] });
  };

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: e => {
        if (isDefaultIndexChanged.value) {
          return;
        }

        const offsetX = e.contentOffset.x;
        const index = Math.max(
          Math.floor(Math.floor(offsetX) / Math.floor(currentCardWith)),
          0
        );

        if (currentIndexShared.value !== index) {
          runOnJS(slideToIndex)(index);
        }
      },
      onBeginDrag: () => {
        if (isDefaultIndexChanged.value) {
          isDefaultIndexChanged.value = false;
        }
      },
    },
    [defaultIndex]
  );

  useEffect(() => {
    if (!defaultIndex) return;

    currentIndexShared.value = defaultIndex;
    isDefaultIndexChanged.value = true;
    const offsetX = currentCardWith * defaultIndex;

    scrollRef.current?.scrollTo({ x: offsetX, animated: true });
  }, [defaultIndex]);

  return (
    <View style={[isFullScreen && StyleSheet.absoluteFillObject, style]}>
      <Animated.ScrollView
        ref={scrollRef as any}
        horizontal
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        snapToInterval={currentCardWith}
        decelerationRate="fast"
      >
        {data.map((info, i) => {
          if (isFullScreen) {
            return (
              <View
                style={{ height: layoutHeight, width: windowWidth }}
                key={i}
              >
                {renderItem({
                  item: info,
                  index: i,
                })}
              </View>
            );
          }

          return renderItem({
            item: info,
            index: i,
          });
        })}
      </Animated.ScrollView>
      {!noDots && (
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.01)', 'rgba(0, 0, 0, 0.4)']}
          style={styles.dots}
        >
          <CarouselDots currentIndex={currentIndex} totalCount={data.length} />
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  dots: {
    height: 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
  },
});
