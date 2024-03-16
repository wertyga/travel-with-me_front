import * as FileSystem from 'expo-file-system';

export const getCompressedUrl = (url: string, width?: number) => {
  return width ? `${url}?width=${width}` : url;
};
