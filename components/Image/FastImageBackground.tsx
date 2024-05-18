import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
  View,
} from 'react-native';
import { cacheImage, findImageInCache } from '@/utils';

type Props = Omit<ImageBackgroundProps, 'source'> & {
  uri: string | number;
};

export const FastImageBackground = ({
  uri,
  style,
  children,
  ...imageProps
}: Props) => {
  const [imgUri, setImgUri] = useState(typeof uri === 'number' ? uri : '');

  useEffect(() => {
    async function handleCache() {
      if (typeof uri === 'number' || !uri) return;

      const cachedUri = await findImageInCache(uri);

      if (cachedUri.uri) {
        setImgUri(cachedUri.uri);
      } else {
        const newUri = await cacheImage(uri);

        setImgUri(newUri.uri);
      }
    }

    handleCache();
  }, [uri]);

  const source: any = typeof uri === 'number' ? uri : { uri: imgUri };
  return (
    <>
      {imgUri ? (
        <ImageBackground source={source} style={style} {...imageProps}>
          {children}
        </ImageBackground>
      ) : (
        <View
          style={{
            ...style,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <ActivityIndicator size={33} style={styles.loader} />
          {children}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});
