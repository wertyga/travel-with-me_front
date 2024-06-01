import {
  ImageBackground,
  ImageStyle,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import { LinearGradientProps } from 'expo-linear-gradient/src/LinearGradient';
import { gradientDirections } from './ImageBackgroundWithGradient.utils';

type Props = Pick<LinearGradientProps, 'locations'> & {
  image: number | string;
  children: React.ReactNode;
  style?: StyleProp<ImageStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  gradient?: keyof typeof gradientDirections | LinearGradientProps['colors'];
};

export const ImageBackgroundWithGradient = ({
  children,
  image,
  style,
  contentStyle,
  gradient = 'top',
  locations,
}: Props) => {
  const imageSource = typeof image === 'string' ? { uri: image } : image;
  const gradientValue =
    typeof gradient === 'string' ? gradientDirections[gradient] : gradient;

  return (
    <ImageBackground source={imageSource} style={[styles.container, style]}>
      <LinearGradient
        colors={gradientValue}
        style={[styles.gradient, contentStyle]}
        locations={locations}
      >
        {children}
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
