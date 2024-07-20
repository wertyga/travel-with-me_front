import {
  ActivityIndicator,
  Image,
  ImageProps,
  View,
  ViewStyle,
} from 'react-native';

import { useFastImage } from '@/components/FastImage/FastImage.utils';

type Props = Omit<ImageProps, 'style' | 'source'> & {
  source: string | number;
  style?: ImageProps['style'] | ViewStyle;
  imageWidth?: number;
};

export const FastImage = ({
  source,
  style = {},
  imageWidth,
  ...imageProps
}: Props) => {
  const imgSource = useFastImage(source, imageWidth);

  return (
    <>
      {!!imgSource ? (
        <Image
          source={imgSource}
          style={style as ImageProps['style']}
          {...imageProps}
        />
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
