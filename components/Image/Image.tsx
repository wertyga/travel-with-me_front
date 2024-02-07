import { ImageProps, Image as RNImage } from 'react-native';
// import CachedImage from 'expo-cached-image';
// import { getCompressedUrl } from '@/utils';
import { ImageURISource } from 'react-native/Libraries/Image/ImageSource';

type CachedImageSource = Omit<ImageURISource, 'uri'> & {
  uri: string;
  expiresIn?: number;
};

export type CImageProps = Omit<ImageProps, 'source'> & {
  width?: number;
  source: CachedImageSource | ImageProps['source'];
};

export const Image = ({ width, source, style, ...imageProps }: CImageProps) => {
  const isUri = !!(source as any)?.uri;

  return <RNImage source={source} style={style} {...imageProps} />;

  // if (!isUri) {
  //   return <RNImage source={source} style={style} {...imageProps} />;
  // }
  //
  // return (
  //   <CachedImage
  //     source={{
  //       ...source,
  //       uri: getCompressedUrl((source as any).uri, width),
  //     }}
  //     cacheKey={(source as any).uri.split('/').reverse()[0] || source}
  //     style={style}
  //     {...imageProps}
  //   />
  // );
};
