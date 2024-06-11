import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ImageBackgroundProps,
  View,
  ViewStyle,
} from 'react-native';
import { handleCacheImage } from '@/components/FastImage/FastImage.utils';

type Props = Omit<ImageBackgroundProps, 'style' | 'source'> & {
  source: string | number;
  style?: ImageBackgroundProps['style'] | ViewStyle;
};

export const FastImageBackground = ({
  source,
  style = {},
  ...imageProps
}: Props) => {
  const isLocalImage = typeof source === 'number';

  const [imgUri, setUri] = useState('');

  useEffect(() => {
    if (isLocalImage) return;

    handleCacheImage(source, setUri);
  }, []);

  const isRenderImage = isLocalImage || !!imgUri;
  return (
    <>
      {isRenderImage ? (
        <ImageBackground
          source={isLocalImage ? source : { uri: imgUri }}
          style={style}
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
