import {
  View as NativeView,
  TouchableOpacity as NativeTouchableOpacity,
  Text as NativeText,
  ImageBackground as NativeImageBackground,
  Image as NativeImage,
} from 'react-native';
import { LinearGradient as LinearGradientNative } from 'expo-linear-gradient';
import { styled } from 'nativewind';

export const View = styled(NativeView);
export const TouchableOpacity = styled(NativeTouchableOpacity);
export const Text = styled(NativeText);
export const ImageBackground = styled(NativeImageBackground);
export const Image = styled(NativeImage);
export const LinearGradient = styled(LinearGradientNative);
