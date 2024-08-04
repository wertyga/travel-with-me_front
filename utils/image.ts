import { Dimensions } from 'react-native';

export const getCompressedUrl = (url: string | number, width?: number) => {
  if (typeof url === 'number') return url;

  return `${url}${!!width ? `?width=${Math.ceil(width)}` : ''}`;
};

export const getHeight = (percent: number, sidePadding: number = 0) => {
  return ((Dimensions.get('window').width - sidePadding) / 100) * percent;
};
