import { Image as RNImage, ImageProps as RNImageProps } from 'react-native';

type Props = Omit<RNImageProps, 'source'> & {
  source: number | string;
  defaultImage?: string;
};

export const Image = ({ source, defaultImage, ...props }: Props) => {
  const imageSource =
    typeof source === 'number' ? source : { uri: source || defaultImage };

  return <RNImage source={imageSource} {...props} />;
};
