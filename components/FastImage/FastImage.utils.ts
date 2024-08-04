import { useEffect, useState } from 'react';

import { ImageSourcePropType } from 'react-native';

import { cacheImage, findImageInCache, getCompressedUrl } from '@/utils';

export const handleCacheImage = async (
  uri: string,
  setUri: (cachedUri: string) => void
) => {
  const { exists, uri: cachedUri } = await findImageInCache(uri);

  if (exists && cachedUri) {
    setUri(cachedUri);

    return;
  }

  const { cached, uri: path } = await cacheImage(uri);

  if (cached && path) {
    setUri(path);

    return;
  }

  setUri(uri);
};

export const useFastImage = (
  source: string | number,
  width?: number
): ImageSourcePropType | '' => {
  const isLocalImage = typeof source === 'number';

  const [imgUri, setUri] = useState('');

  useEffect(() => {
    if (isLocalImage) return;

    const compressedUrl = getCompressedUrl(source, width) as string;

    handleCacheImage(compressedUrl, setUri);
  }, []);

  if (isLocalImage) {
    return source;
  }

  return !!imgUri ? { uri: imgUri } : '';
};
