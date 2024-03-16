import { useEffect, useState } from 'react';
import { ImageProps, Image, View, ActivityIndicator } from 'react-native';
import { findImageInCache, cacheImage } from '@/utils';

export type FastImageProps = Omit<ImageProps, 'source'> & {
  uri: string | number;
};

export const FastImage = ({ uri, style, ...imageProps }: FastImageProps) => {
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
        <Image source={source} style={style} {...imageProps} />
      ) : (
        <View
          style={{ ...style, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size={33} />
        </View>
      )}
    </>
  );
};
