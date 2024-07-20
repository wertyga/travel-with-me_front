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

export const cacheBunchImages = async (imagesUris: string[]) => {
  await Promise.all(
    imagesUris.map(async uri => {
      const imageInCache = await findImageInCache(uri);

      if (!imageInCache.exists || !imageInCache.uri) {
        await cacheImage(uri);
      }
    })
  );
};
