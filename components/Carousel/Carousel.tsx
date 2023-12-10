import { View, Image, ViewStyle } from 'react-native';
import CarouselEx from 'react-native-snap-carousel';
import * as React from 'react';

type Props = {
  images: string[];
  onChange?: () => void;
  containerClassName?: string;
  sliderWidth: number;
  itemWidth: number;
  onSnapToItem?: (index: number) => void;
};

export const Carousel = ({
  images,
  containerClassName = '',
  sliderWidth,
  itemWidth,
  onSnapToItem,
  style,
}: Props) => {
  return (
    <View className={containerClassName}>
      <CarouselEx
        layout="tinder"
        data={images as any}
        onSnapToItem={onSnapToItem}
        renderItem={({ item }: any) => {
          return (
            <Image
              source={{ uri: item }}
              className="h-full w-full object-cover"
              key={item}
            />
          );
        }}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    </View>
  );
};
