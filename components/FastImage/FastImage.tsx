import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { cacheImage, findImageInCache } from '@/utils';

export const FastImage = props => {
  const {
    source: { uri },
    cacheKey,
    style,
  } = props;
  // const isMounted = useRef(true);
  const [imgUri, setUri] = useState('');

  useEffect(() => {
    async function loadImg() {
      const { exists, uri: cachedUri } = await findImageInCache(uri);
      if (exists && cachedUri) {
        setUri(cachedUri);

        return;
      }

      const { cached, path } = await cacheImage(uri);

      if (cached && path) {
        setUri(path);

        return;
      }

      setUri(uri);
    }

    loadImg();
  }, []);

  return (
    <>
      {imgUri ? (
        <Image source={{ uri: imgUri }} style={style} />
      ) : (
        <View
          style={{ ...style, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size={33} />
        </View>
      )}
    </>
  );
};
