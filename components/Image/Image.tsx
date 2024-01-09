import CachedImage from 'expo-cached-image';
import { getCompressedUrl } from '@/utils';
import { ImageProps } from 'react-native';

type Props = Omit<ImageProps, 'source'> & {
  width?: number;
  uri: string;
};

export const Image = ({ width, uri, ...imageProps }: Props) => {
  return (
    <CachedImage
      source={{
        uri: getCompressedUrl(uri, width),
      }}
      cacheKey={uri.split('/').reverse()[0]}
      {...imageProps}
    />
  );
};
