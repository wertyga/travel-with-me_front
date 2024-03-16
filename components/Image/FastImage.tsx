import { useEffect, useState } from 'react';
import { ImageProps, Image, View, ActivityIndicator } from 'react-native';
import { findImageInCache, cacheImage } from '@/utils';

export type FastImageProps = Omit<ImageProps, 'source'> & { uri: string };

export const FastImage = ({ uri, style, ...imageProps }: FastImageProps) => {
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
        <Image source={{ uri: imgUri }} style={style} {...imageProps} />
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
