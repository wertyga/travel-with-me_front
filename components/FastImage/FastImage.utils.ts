import { cacheImage, findImageInCache } from '@/utils';

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
