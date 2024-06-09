import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageProps,
  View,
  ViewStyle,
} from 'react-native';
import { handleCacheImage } from '@/components/FastImage/FastImage.utils';

type Props = Omit<ImageProps, 'style' | 'source'> & {
  source: string | number;
  style?: ImageProps['style'] | ViewStyle;
};

export const FastImage = ({ source, style = {}, ...imageProps }: Props) => {
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
        <Image
          source={isLocalImage ? source : { uri: imgUri }}
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
