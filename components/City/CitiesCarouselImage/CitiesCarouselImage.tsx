import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { FastImage } from '@/components/Image';
import { City } from '@/types';
import { useSelector } from '@/stores';

type Props = {
  item: City;
};

export const CitiesCarouselImage = ({ item }: Props) => {
  const layoutHeight = useSelector(({ domStore }) => domStore?.layout?.height);
  return (
    <FastImage
      key={item._id}
      uri={item.image}
      style={[styles.cityImage, { height: layoutHeight }]}
    />
  );
};

const styles = StyleSheet.create({
  imageWrapper: {},
  cityImage: {
    width: Dimensions.get('window').width,
  },
});
