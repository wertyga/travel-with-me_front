import { View, Image } from 'react-native';
import CarouselEx from 'react-native-snap-carousel';
import * as React from 'react';

type Props = {
  images: string[];
  onChange?: () => void;
  containerClassName?: string;
  sliderWidth: number;
  itemWidth: number;
  onSnapToItem?: (index: number) => void;
  carouselRef?: any;
};

export const Carousel = ({
  images,
  containerClassName = '',
  sliderWidth,
  itemWidth,
  onSnapToItem,
  carouselRef,
}: Props) => {
  return (
    <View className={containerClassName}>
      <CarouselEx
        layout="tinder"
        ref={carouselRef}
        data={images as any}
        disableIntervalMomentum={true}
        onSnapToItem={onSnapToItem}
        renderItem={({ item }: any) => {
          return (
            <LinearGradient colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)']}>
              <Image
                source={{ uri: item }}
                className="h-full w-full object-cover"
                key={item}
              />
            </LinearGradient>
          );
        }}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    </View>
  );
};
