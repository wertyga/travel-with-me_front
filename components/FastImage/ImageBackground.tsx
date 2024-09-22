import {
  ImageBackground as RNImageBackground,
  ImageBackgroundProps as RNImageBackgroundProps,
} from 'react-native';

type Props = Omit<RNImageBackgroundProps, 'source'> & {
  source: number | string;
  defaultImage?: string;
};

export const ImageBackground = ({ source, defaultImage, ...props }: Props) => {
  const imageSource =
    typeof source === 'number' ? source : { uri: source || defaultImage };

  return <RNImageBackground source={imageSource} {...props} />;
};
