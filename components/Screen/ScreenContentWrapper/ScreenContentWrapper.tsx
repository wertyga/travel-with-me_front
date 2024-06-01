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
import { BackgroundGradient } from '@/components/BackgroundGradient';
import {
  CarouselNew,
  Props as CarouselProps,
} from '@/components/CarouselNew/CarouselNew';
import { useSelector } from '@/stores';
import { CONSTANTS } from '@/styles/constants';

type Props<T> = Omit<CarouselProps, 'data' | 'renderItem'> & {
  data: T[];
  carouselStyles?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  imageKey: string;
  defaultImage?: number;
  children?: React.ReactNode;
};

export const ScreenContentWrapper = <DATA,>({
  data,
  carouselStyles,
  imageKey,
  children,
  defaultImage,
  imageStyle = {},
  ...carouselProps
}: Props<DATA>) => {
  const layoutHeight = useSelector(
    ({ domStore }) => domStore?.layout?.height || 0
  );

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
        renderItem={({ item }) => {
          const imageSrc: string = (item as any)[imageKey] as string;

          return (
            <Image
              key={imageSrc}
              source={imageSrc ? { uri: imageSrc } : defaultImage}
              style={[styles.image, imageStyle]}
            />
          );
        }}
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
