import {
  ActivityIndicator,
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { useFastImage } from '@/components/FastImage/FastImage.utils';

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
  ...imageProps
}: Props) => {
  const imgSource = useFastImage(source, imageWidth, withBlur);

  return (
    <>
      {!!imgSource ? (
        <ImageBackground source={imgSource} style={style} {...imageProps} />
      ) : (
        <View
          style={{
            ...(style as ViewStyle),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {imageProps.children}
          <ActivityIndicator
            size={33}
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
          />
        </View>
      )}
    </>
  );
};
