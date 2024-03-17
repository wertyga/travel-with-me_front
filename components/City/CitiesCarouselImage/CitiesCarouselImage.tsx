import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated as RNAnimated, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { FastImage } from '@/components/Image';
import { City } from '@/types';

type Props = {
  item: City;
  isActive?: boolean;
};

export const CitiesCarouselImage = ({ item, isActive }: Props) => {
  // const imageAnimatedScaleValues = useSharedValue({
  //   scale: isActive ? 1 : 0.95,
  // });
  // const imageAnimatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         scale: withTiming(imageAnimatedScaleValues.value.scale),
  //       },
  //     ],
  //   } as any;
  // });

  // useEffect(() => {
  //   imageAnimatedScaleValues.value = {
  //     scale: isActive ? 1 : 0.95,
  //   };
  // }, [isActive]);

  return <FastImage key={item._id} uri={item.image} style={styles.cityImage} />;

  // return (
  //   <View style={[styles.imageWrapper, imageAnimatedStyles]}>
  //     <FastImage key={item._id} uri={item.image} style={styles.cityImage} />
  //   </View>
  // );
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: '100%',
    height: '100%',
  },
  cityImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});
