import * as FileSystem from 'expo-file-system';

const getCacheDirectoryForUri = (uri: string) => {
  const cacheFilenameWithQueryParams = uri.split('?').slice(1).join('-');
  const clearFilename = uri.split('/').pop();
  const filename = `${clearFilename}${cacheFilenameWithQueryParams}`;

  return `${FileSystem.cacheDirectory}${filename}`;
};

export async function findImageInCache(uri: string) {
  try {
    const cacheUri = getCacheDirectoryForUri(uri);
    let info = await FileSystem.getInfoAsync(cacheUri);

    return { ...info, err: false };
  } catch (error) {
    return {
      exists: false,
      err: true,
      msg: error,
      uri: '',
    };
  }
}

export async function cacheImage(uri: string) {
  try {
    const cacheUri = getCacheDirectoryForUri(uri);
    const downloadImage = FileSystem.createDownloadResumable(uri, cacheUri, {});
    const downloaded = await downloadImage.downloadAsync();

    return {
      cached: true,
      err: false,
      uri: downloaded?.uri || '',
    };
  } catch (error) {
    return {
      cached: false,
      err: true,
      msg: error,
      uri: '',
    };
  }
}

export const getImageFromCacheOrSaveImageToCache = async (imageUri: string) => {
  let cachedImage: any = await findImageInCache(imageUri);
  if (cachedImage.exists && cachedImage.uri) {
    return cachedImage.uri;
  }

  cachedImage = await cacheImage(imageUri);

  return cachedImage.uri;
};

export const getCachedBunchImages = async (imagesUris: string[]) => {
  return Promise.all(
    imagesUris.map(uri => {
      return getImageFromCacheOrSaveImageToCache(uri);
    })
  );
};
