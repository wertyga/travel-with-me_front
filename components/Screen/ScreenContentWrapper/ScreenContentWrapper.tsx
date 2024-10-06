import React from 'react';

import {
  Dimensions,
  Image,
  ImageStyle,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { observer } from 'mobx-react-lite';

import { BackgroundGradient } from '@/components/BackgroundGradient';
import {
  CarouselNew,
  Props as CarouselProps,
} from '@/components/CarouselNew/CarouselNew';
import { MEDIA_SIZES } from '@/components/FastImage/FastImage';
import { PointMeta } from '@/components/Point/PointMeta/PointMeta';
import { useStores } from '@/hooks';
import { FastImage } from 'components/FastImage';

import { CONSTANTS } from '@/styles/constants';

type Props<T> = Pick<CarouselProps, 'defaultIndex' | 'onChange'> & {
  data: T[];
  imageStyle?: ImageStyle;
  imageKey: string;
  defaultImage?: number;
  isFastImage?: boolean;
  noBorderRadius?: boolean;
  children?: React.ReactNode;
  renderItem?: (data: { item: any }) => React.ReactNode;
};

export const ScreenContentWrapperComponent = <DATA,>({
  data,
  imageKey,
  children,
  defaultImage,
  renderItem,
  isFastImage,
  noBorderRadius,
  imageStyle = {},
  defaultIndex,
  onChange,
}: Props<DATA>) => {
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
  const carouselHeight = windowHeight - 300;

  const renderItemHandler = <DATA,>(data: { item: DATA }) => {
    if (renderItem) {
      return renderItem(data);
    }

    const imageSrc: string = (data.item as any)[imageKey] as string;

    if (isFastImage) {
      return (
        <FastImage
          key={imageSrc}
          source={imageSrc}
          style={{
            ...styles.image,
            height: carouselHeight,
            width: windowWidth,
            ...imageStyle,
          }}
          mediaSize={MEDIA_SIZES.Big}
        />
      );
    }
    return (
      <Image
        key={imageSrc}
        source={{ uri: imageSrc }}
        style={[
          styles.image,
          { height: carouselHeight, width: windowWidth },
          imageStyle,
        ]}
        defaultSource={defaultImage}
      />
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      <CarouselNew<DATA>
        dotsStyle={{
          paddingBottom: 12,
        }}
        data={data}
        cardWidth={windowWidth}
        defaultIndex={defaultIndex}
        onChange={onChange}
        renderItem={renderItemHandler}
      />

      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    objectFit: 'cover',
  },
  content: {
    padding: CONSTANTS.spaces.paddingHorizontal,
    paddingTop: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  dotsStyle: {},
});

export const ScreenContentWrapper = observer(ScreenContentWrapperComponent);
