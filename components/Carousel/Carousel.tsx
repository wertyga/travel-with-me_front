import { Dimensions, Text, View, Image } from 'react-native';
import CarouselEx, {
  CarouselProperties,
  ParallaxImageStatic,
} from 'react-native-snap-carousel';
import * as React from 'react';
import { useRef } from 'react';

type Props = {
  images: string[];
  onChange?: () => void;
  className?: string;
  sliderWidth: number;
  itemWidth: number;
  onSnapToItem: (index: number) => void;
  // refCarousel: any;
};

export const Carousel = ({
  images,
  refCarousel,
  className,
  sliderWidth,
  itemWidth,
  onSnapToItem,
}: Props) => {
  const ref = useRef();

  return (
    <View className={className}>
      <CarouselEx
        layout="tinder"
        layoutCardOffset={9}
        ref={ref}
        data={images as any}
        onSnapToItem={onSnapToItem}
        renderItem={({ item }: any) => {
          return (
            <Image
              source={{ uri: item }}
              className="h-full w-full"
              key={item}
            />
          );
        }}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideShift={0}
        useScrollView={true}
      />
    </View>
  );
};
