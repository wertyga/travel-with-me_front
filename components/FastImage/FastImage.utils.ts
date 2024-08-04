import { useEffect, useState } from 'react';

import { ImageSourcePropType } from 'react-native';

import {
  findImageInCache,
  getCompressedUrl,
  getImageFromCacheOrSaveImageToCache,
} from '@/utils';

export const handleCacheImage = async (
  uri: string,
  setUri: (cachedUri: string) => void,
  withBlur?: boolean
) => {
  try {
    if (withBlur) {
      const { exists } = await findImageInCache(uri);

      if (!exists) {
        setUri(`${uri}?blur=100`);
      }
    }

    const cachedUri = await getImageFromCacheOrSaveImageToCache(uri);

    setUri(cachedUri);
  } catch (e) {
    setUri(uri);
  }
};

export const useFastImage = (
  source: string | number,
  width?: number,
  withBlur?: boolean
): ImageSourcePropType | null => {
  const isLocalImage = typeof source === 'number';

  const [imgUri, setUri] = useState(null);

  useEffect(() => {
    if (isLocalImage) return;

    const compressedUrl = getCompressedUrl(source, width) as string;

    handleCacheImage(compressedUrl, setUri, withBlur);
  }, []);

  if (isLocalImage) {
    return source;
  }

  return !!imgUri ? { uri: imgUri } : null;
};
