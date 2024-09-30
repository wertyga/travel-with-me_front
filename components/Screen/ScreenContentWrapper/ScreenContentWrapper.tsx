import React from 'react';

import {
  Dimensions,
  Image,
  ImageStyle,
  ScrollView,
  StyleSheet,
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
import { useStores } from '@/hooks';
import { FastImage } from 'components/FastImage';

import { CONSTANTS } from '@/styles/constants';

type Props<T> = Omit<CarouselProps, 'data' | 'renderItem'> & {
  data: T[];
  carouselStyles?: StyleProp<ViewStyle>;
  imageStyle?: ImageStyle;
  imageKey: string;
  defaultImage?: number;
  isFastImage?: boolean;
  children?: React.ReactNode;
  renderItem?: (data: { item: any }) => React.ReactNode;
};

export const ScreenContentWrapperComponent = <DATA,>({
  data,
  carouselStyles,
  imageKey,
  children,
  defaultImage,
  renderItem,
  isFastImage,
  imageStyle = {},
  ...carouselProps
}: Props<DATA>) => {
  const { layoutHeight } = useStores(stores => ({
    layoutHeight: stores.domStore.layoutHeight,
  }));

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
          style={{ ...styles.image, ...imageStyle }}
          mediaSize={MEDIA_SIZES.Big}
          // defaultSource={defaultImage}
        />
      );
    }
    return (
      <Image
        key={imageSrc}
        source={{ uri: imageSrc }}
        style={[styles.image, imageStyle]}
        defaultSource={defaultImage}
      />
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: '100%',
        paddingBottom: 20,
      }}
    >
      <CarouselNew<DATA>
        data={data}
        style={carouselStyles}
        renderItem={renderItemHandler}
        {...carouselProps}
      />
      {!!children && (
        <BackgroundGradient
          style={[
            styles.content,
            { top: layoutHeight - 300, paddingBottom: layoutHeight - 300 },
          ]}
        >
          {children}
        </BackgroundGradient>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('screen').height,
    objectFit: 'cover',
  },
  content: {
    padding: CONSTANTS.spaces.paddingHorizontal,
    paddingTop: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export const ScreenContentWrapper = observer(ScreenContentWrapperComponent);
