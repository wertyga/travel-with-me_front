import {
  StyleSheet,
  ImageBackground,
  ImageBackgroundProps,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import { cacheImage, findImageInCache } from '@/utils';

type Props = Omit<ImageBackgroundProps, 'source'> & {
  uri: string;
};

export const FastImageBackground = ({
  uri,
  style,
  children,
  ...imageProps
}: Props) => {
  const [imgUri, setImgUri] = useState('');

  useEffect(() => {
    async function handleCache() {
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

  return (
    <>
      {imgUri ? (
        <ImageBackground source={{ uri: imgUri }} style={style} {...imageProps}>
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
