import {
  ImageBackgroundProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { FastImage, FastImageProps } from './FastImage';

type Props = Omit<ImageBackgroundProps, 'style' | 'source'> & {
  source: string | number;
  style?: ImageBackgroundProps['style'] | ViewStyle;
  withBlur?: boolean;
  mediaSize?: FastImageProps['mediaSize'];
};

export const FastImageBackground = ({
  source,
  style = {},
  mediaSize,
  withBlur,
  defaultSource,
  ...imageProps
}: Props) => {
  return (
    <View style={[style]}>
      <FastImage
        source={source}
        mediaSize={mediaSize}
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
