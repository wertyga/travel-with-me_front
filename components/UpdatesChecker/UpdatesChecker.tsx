import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import * as Updates from 'expo-updates';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { useFocus, useStores } from '@/hooks';

import { FONTS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import Logo from '@/assets/logo2112.png';

const DEFAULT_Y_VALUE = 300;

const UpdatesChecker = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { isAppReady, isUpdateAvailable, downloadUpdate, isUpdateDownloading } =
    useStores(stores => ({
      isAppReady: stores.appStateStore.isAppReady,
      isUpdateAvailable: stores.appStateStore.isUpdateAvailable,
      isUpdateDownloading: stores.appStateStore.isUpdateDownloading,
      downloadUpdate: stores.appStateStore.downloadUpdate,
    }));

  const aTranslateY = useSharedValue(DEFAULT_Y_VALUE);
  const aStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: aTranslateY.value }],
    };
  });

  useEffect(() => {
    if (isAppReady && isUpdateAvailable) {
      setIsOpened(true);
    }
  }, [isUpdateAvailable, isAppReady]);

  useEffect(() => {
    aTranslateY.value = withTiming(isOpened ? -20 : DEFAULT_Y_VALUE);
  }, [isOpened]);

  return (
    <Animated.View style={[styles.container, aStyles]}>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Image source={Logo} style={styles.logo} />
        <CText style={styles.header}>Update is available</CText>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          onPress={downloadUpdate}
          style={{
            ...styles.action,
            marginBottom: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
          disabled={isUpdateDownloading}
        >
          {isUpdateDownloading && <ActivityIndicator />}
          <CText style={styles.text}>Download</CText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.action}
          disabled={isUpdateDownloading}
          onPress={() => {
            setIsOpened(false);
          }}
        >
          <CText style={styles.text}>Dismiss</CText>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default observer(UpdatesChecker);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 0,
    zIndex: 10,
    backgroundColor: CONSTANTS.colors.bg1,
    borderRadius: 6,
    padding: 10,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  action: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 40,
  },
  text: {
    color: CONSTANTS.colors.bg1,
    fontFamily: FONTS.OpenSansSemiBold,
  },
  header: {
    fontSize: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 20,
  },
});
