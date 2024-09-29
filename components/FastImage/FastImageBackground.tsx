import {
  ImageBackgroundProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { FastImage } from './FastImage';

type Props = Omit<ImageBackgroundProps, 'style' | 'source'> & {
  source: string | number;
  style?: ImageBackgroundProps['style'] | ViewStyle;
  imageWidth?: number;
  withBlur?: boolean;
};

export const FastImageBackground = ({
  source,
  style = {},
  imageWidth,
  withBlur,
  defaultSource,
  ...imageProps
}: Props) => {
  return (
    <View style={[style]}>
      <FastImage
        source={source}
        style={{
          ...StyleSheet.absoluteFillObject,
          width: '100%',
          height: '100%',
          zIndex: -1,
          objectFit: 'cover',
        }}
      />
      {imageProps.children}
    </View>
  );
};
