import * as FileSystem from 'expo-file-system';

const getFileNameFromUri = (uri: string) => {
  return uri.split('/').pop();
};

const getCacheDirectoryForUri = (uri: string) => {
  return `${FileSystem.cacheDirectory}${getFileNameFromUri(uri)}`;
};

export async function findImageInCache(uri) {
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

export async function cacheImage(uri) {
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
