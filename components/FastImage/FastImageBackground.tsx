import {
  ActivityIndicator,
  ImageBackground,
  ImageBackgroundProps,
  View,
  ViewStyle,
} from 'react-native';

import { useFastImage } from '@/components/FastImage/FastImage.utils';

type Props = Omit<ImageBackgroundProps, 'style' | 'source'> & {
  source: string | number;
  style?: ImageBackgroundProps['style'] | ViewStyle;
  imageWidth?: number;
};

export const FastImageBackground = ({
  source,
  style = {},
  imageWidth,
  ...imageProps
}: Props) => {
  const imgSource = useFastImage(source, imageWidth);

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
          <ActivityIndicator size={33} />
        </View>
      )}
    </>
  );
};
