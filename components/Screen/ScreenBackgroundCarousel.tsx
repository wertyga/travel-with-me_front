import React from 'react';

import { Dimensions, StyleSheet } from 'react-native';

import { CarouselNew } from '@/components/CarouselNew/CarouselNew';
import { FastImage } from 'components/FastImage';

type Props = {
  images: string[];
};

export const ScreenBackgroundCarousel = ({ images }: Props) => {
  return (
    <CarouselNew
      data={images}
      style={styles.container}
      onChange={(...data) => console.log(data)}
      renderItem={({ item: imageSrc }) => {
        return (
          <FastImage
            key={imageSrc}
            source={imageSrc}
            style={{
              width: '100%',
              height: Dimensions.get('screen').height,
              objectFit: 'cover',
              zIndex: 100,
            }}
          />
        );
      }}
      noDots
      isFullScreen
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});
