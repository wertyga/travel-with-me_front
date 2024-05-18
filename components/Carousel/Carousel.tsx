import * as React from 'react';
import { Image, View, ViewStyle } from 'react-native';
import CarouselEx from 'react-native-snap-carousel';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  images: string[];
  onChange?: () => void;
  style?: StyleProp<ViewStyle>;
  sliderWidth: number;
  itemWidth: number;
  onSnapToItem?: (index: number) => void;
  carouselRef?: any;
};

export const Carousel = ({
  images,
  style,
  sliderWidth,
  itemWidth,
  onSnapToItem,
  carouselRef,
}: Props) => {
  return (
    <View style={style}>
      <CarouselEx
        layout="tinder"
        ref={carouselRef}
        data={images as any}
        onSnapToItem={onSnapToItem}
        vertical={false}
        renderItem={({ item }: any) => {
          return (
            <LinearGradient colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)']}>
              <Image source={{ uri: item }} key={item} />
            </LinearGradient>
          );
        }}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    </View>
  );
};
