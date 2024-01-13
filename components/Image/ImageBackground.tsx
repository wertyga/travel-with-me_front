import { StyleSheet, View, ViewStyle } from 'react-native';
import { Image, CImageProps } from './Image';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = Omit<CImageProps, 'style'> & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const ImageBackground = ({ children, style, ...imageProps }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Image style={styles.image} {...imageProps} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
});
