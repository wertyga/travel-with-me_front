import { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  ImageStyle,
  Image as RNImage,
  StyleSheet,
  View,
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// import { Image as ExpoImage } from 'expo-image';
import { sendLogs } from '@/api';
import { CText } from '@/components/CText';

export enum MEDIA_SIZES {
  Large = '1000',
  Big = '800',
  Small = '500',
  ExtraSmall = '200',
}

export type FastImageProps = {
  source: string | number;
  style?: ImageStyle;
  hideProgress?: boolean;
  mediaSize?: MEDIA_SIZES;
};

export const FastImage = ({
  source,
  style = {},
  hideProgress,
  mediaSize,
}: FastImageProps) => {
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
      <RNImage
        source={
          typeof source === 'number'
            ? source
            : {
                uri: mediaSize ? `${source}?width=${mediaSize}` : source,
              }
        }
        style={style}
        onError={onError}
        onLoad={onLoadSuccess}
        onLoadStart={onLoadStart}
      />
    </>
  );
};

const styles = StyleSheet.create({
  placeholder: { alignItems: 'center', justifyContent: 'center' },
});
