import { Dimensions } from 'react-native';
import { CONSTANTS } from '@/styles/constants';

export const getCompressedUrl = (url: string, width?: number) => {
  return width ? `${url}?width=${width}` : url;
};

export const getHeight = (percent: number, sidePadding: number = 0) => {
  return ((Dimensions.get('window').width - sidePadding) / 100) * percent;
};
