import { View, Image } from 'react-native';
import CarouselEx from 'react-native-snap-carousel';
import * as React from 'react';

type Props = {
  images: string[];
  onChange?: () => void;
  className?: string;
  sliderWidth: number;
  itemWidth: number;
  onSnapToItem: (index: number) => void;
};

export const Carousel = ({
  images,
  className,
  sliderWidth,
  itemWidth,
  onSnapToItem,
}: Props) => {
  return (
    <View className={className}>
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
