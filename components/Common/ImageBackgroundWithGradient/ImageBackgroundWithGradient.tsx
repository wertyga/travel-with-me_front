import {
  ImageBackground,
  ImageStyle,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { LinearGradient } from 'expo-linear-gradient';
import { LinearGradientProps } from 'expo-linear-gradient/src/LinearGradient';

import { FastImageBackground } from '@/components/FastImage';

import { gradientDirections } from './ImageBackgroundWithGradient.utils';

type Props = Pick<LinearGradientProps, 'locations'> & {
  image: number | string;
  children: React.ReactNode;
  style?: StyleProp<ImageStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  gradient?: keyof typeof gradientDirections | LinearGradientProps['colors'];
  isFastImage?: boolean;
  withBlur?: boolean;
  imageWidth?: number;
};

export const ImageBackgroundWithGradient = ({
  children,
  image,
  style = {},
  contentStyle,
  gradient = 'top',
  locations,
  imageWidth,
  isFastImage,
  withBlur,
}: Props) => {
  const gradientValue =
    typeof gradient === 'string' ? gradientDirections[gradient] : gradient;

  const ComponentWrapper = isFastImage ? FastImageBackground : ImageBackground;
  const source = isFastImage
    ? image
    : typeof image === 'string'
      ? { uri: image }
      : image;

  return (
    <ComponentWrapper
      source={source as any}
      style={style}
      imageWidth={imageWidth}
      withBlur={withBlur}
      resizeMode="cover"
    >
      <LinearGradient
        colors={gradientValue}
        style={[styles.gradient, contentStyle]}
        locations={locations}
      >
        {children}
      </LinearGradient>
    </ComponentWrapper>
  );
};

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
