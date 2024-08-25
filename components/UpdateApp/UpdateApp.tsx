import { useEffect, useState } from 'react';

import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Entypo } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import { GesturesContainer } from '@/components/Gestures/Gestures';
import { useStores } from '@/hooks';

import { FONTS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

import {
  getIsUserRefusedOfUpdate,
  handleUpdateApp,
  setIsUserRefusedOfUpdate,
} from './UpdateApp.utils';

const CLOSED_TRANSLATE_X_VALUE = Dimensions.get('screen').width + 100;
const OPENED_TRANSLATION_X = CONSTANTS.spaces.paddingHorizontal;
const ANIMATION_TIMEOUT = 200;

const UpdateApp = () => {
  const { isAppReady, isUpdateAvailable } = useStores(stores => ({
    isAppReady: stores.appStateStore.isAppReady,
    isUpdateAvailable: stores.appStateStore.isUpdateAvailable,
  }));

  const [isOpened, setIsOpened] = useState(false);

  const aTranslateX = useSharedValue(CLOSED_TRANSLATE_X_VALUE);
  const aStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: aTranslateX.value }],
    };
  });

  const onClose = () => {
    aTranslateX.value = withTiming(-CLOSED_TRANSLATE_X_VALUE, {
      duration: ANIMATION_TIMEOUT / 1.5,
    });
    setTimeout(() => {
      setIsOpened(false);
    }, ANIMATION_TIMEOUT);

    setIsUserRefusedOfUpdate();
  };

  const onUpdate = e => {
    aTranslateX.value = e.translationX + CONSTANTS.spaces.paddingHorizontal;
  };

  const onEnd = e => {
    if (Math.abs(e.translationX) + Math.abs(e.velocityX) / 10 >= 150) {
      runOnJS(onClose)();
    } else {
      aTranslateX.value = withTiming(OPENED_TRANSLATION_X, {
        duration: ANIMATION_TIMEOUT,
      });
    }
  };

  useEffect(() => {
    const checkForUpdate = async () => {
      const isNoNeedToUpdate = await getIsUserRefusedOfUpdate();
      const isShowUpdate = !isNoNeedToUpdate && isUpdateAvailable && isAppReady;

      setIsOpened(isShowUpdate);
    };

    checkForUpdate();
  }, [isAppReady, isUpdateAvailable]);

  useEffect(() => {
    aTranslateX.value = withTiming(
      isOpened ? CONSTANTS.spaces.paddingHorizontal : CLOSED_TRANSLATE_X_VALUE,
      { duration: ANIMATION_TIMEOUT }
    );
  }, [isOpened]);

  if (!isOpened) return null;

  return (
    <GesturesContainer
      style={styles.container}
      onUpdate={onUpdate}
      onEnd={onEnd}
    >
      <Animated.View
        style={[
          {
            backgroundColor: 'white',
            borderRadius: 3,
            padding: 10,
            width:
              Dimensions.get('window').width -
              CONSTANTS.spaces.paddingHorizontal * 2,
          },
          aStyles,
        ]}
      >
        <TouchableOpacity
          style={styles.content}
          activeOpacity={1}
          onPress={handleUpdateApp}
        >
          <Entypo name="download" size={20} color={CONSTANTS.colors.bg1} />
          <CText style={styles.text}>Update is available</CText>
        </TouchableOpacity>
      </Animated.View>
    </GesturesContainer>
  );
};

export default observer(UpdateApp);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    left: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
  text: {
    color: CONSTANTS.colors.bg1,
    fontFamily: FONTS.OpenSansBold,
    marginLeft: 10,
    marginRight: 10,
  },
});
