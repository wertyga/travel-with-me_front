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
import { useStores } from '@/hooks';
import { CONSTANTS } from '@/styles/constants';

type Props<T> = Omit<CarouselProps, 'data' | 'renderItem'> & {
  data: T[];
  carouselStyles?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  imageKey: string;
  defaultImage?: number;
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
    return (
      <Image
        key={imageSrc}
        source={imageSrc ? { uri: imageSrc } : defaultImage}
        style={[styles.image, imageStyle]}
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
