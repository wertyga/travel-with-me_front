import { ActivityIndicator, StyleSheet } from 'react-native';
import safeLoaderImage from '@/assets/images/safe_loader.png';
import { CText } from '@/components/CText';
import { ImageBackground } from '@/components/Image';
import { FONTS } from '@/types';
import { CONSTANTS } from '@/styles/constants';

type Props = {
  image?: string;
};

export const SafeLoader = ({ image }: Props) => {
  return (
    <ImageBackground
      style={[StyleSheet.absoluteFillObject, styles.container]}
      source={image ? { uri: image } : safeLoaderImage}
    >
      <CText style={styles.text}>Loading...</CText>
      <ActivityIndicator size="large" color={CONSTANTS.colors.bg1} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  text: {
    color: 'black',
    fontFamily: FONTS.OpenSansSemiBold,
    marginBottom: 10,
  },
});
