import { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  ImageStyle,
  Image as RNImage,
  StyleSheet,
  View,
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Image } from 'expo-image';

import { CText } from '@/components/CText';

type Props = {
  source: string | number;
  style?: ImageStyle;
  hideProgress?: boolean;
};

export const FastImage = ({ source, style = {}, hideProgress }: Props) => {
  const [state, setState] = useState({
    progress: 0,
    isLoading: false,
    isLoaded: false,
    isError: false,
  });

  const onError = useCallback(() => {
    setState(prev => ({
      ...prev,
      isError: true,
      isLoading: false,
      progress: 0,
    }));
  }, []);

  const onLoadSuccess = useCallback(() => {
    setState(prev => ({
      ...prev,
      isLoaded: true,
      isLoading: false,
      progress: 0,
    }));
  }, []);

  const onProgress = useCallback(
    ({ loaded, total }) => {
      if (hideProgress) return;

      const onePercent = total / 100;

      setState(prev => ({
        ...prev,
        progress: Math.round(loaded / onePercent),
      }));
    },
    [hideProgress]
  );

  const onLoadStart = useCallback(() => {
    setState(prev => ({
      ...prev,
      progress: 0,
      isLoading: true,
      isLoaded: false,
      isError: false,
    }));
  }, []);

  const isShowPlaceholder = state.isError || state.isLoading;
  const shouldRenderRnImage =
    typeof source === 'number' || source.startsWith('file://');
  return (
    <>
      {isShowPlaceholder && (
        <View style={[style, styles.placeholder]}>
          {state.isLoading && <ActivityIndicator />}
          {!!state.progress && (
            <CText
              style={{ marginTop: 10, fontSize: 12 }}
              light
            >{`${state.progress}%`}</CText>
          )}
          {state.isError && (
            <MaterialIcons name="error-outline" size={24} color="red" />
          )}
        </View>
      )}
      {shouldRenderRnImage && (
        <RNImage
          source={typeof source === 'number' ? source : { uri: source }}
          style={style}
        />
      )}
      {!shouldRenderRnImage && (
        <Image
          source={source}
          style={style}
          cachePolicy="disk"
          onError={onError}
          onLoad={onLoadSuccess}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  placeholder: { alignItems: 'center', justifyContent: 'center' },
});
