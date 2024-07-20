import { Dimensions } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

export const getCompressedUrl = (
  url: string | number,
  width: number = windowWidth
) => {
  return typeof url === 'number' ? url : `${url}?width=${Math.ceil(width)}`;
};

export const getHeight = (percent: number, sidePadding: number = 0) => {
  return ((Dimensions.get('window').width - sidePadding) / 100) * percent;
};
