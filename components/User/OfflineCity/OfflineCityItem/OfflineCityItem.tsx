import { useEffect, useState } from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Animated from 'react-native-reanimated';

import { FontAwesome } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { FastImage } from '@/components/FastImage';
import { GesturesContainer } from '@/components/Gestures/Gestures';
import { useSlideLeft, useStores } from '@/hooks';

import { City, FONTS, SCREENS } from '@/types';

type Props = {
  city: City;
};

const OfflineCityItem = ({ city }: Props) => {
  const [state, setState] = useState({
    size: '',
  });
  const { getCityMemoryUsage, removeCityFromStorage, isLoading } = useStores(
    stores => ({
      getCityMemoryUsage: stores.offlineStore.getCityMemoryUsage,
      removeCityFromStorage: stores.offlineStore.removeCityFromStorage,
      isLoading: stores.offlineStore.isLoading,
    })
  );

  const { onUpdate, animatedStyles, onFinalize } = useSlideLeft({
    thresholdForFinish: 100,
    leftSideTranslation: -80,
  });

  const onPurge = () => {
    removeCityFromStorage(city.slug);
  };

  useEffect(() => {
    getCityMemoryUsage(city.slug).then(size => {
      setState(prev => ({ ...prev, size }));
    });
  }, []);

  const gestures = isLoading
    ? {
        onUpdate: () => {},
      }
    : {
        onUpdate,
        onFinalize,
      };

  return (
    <GesturesContainer {...gestures}>
      <Animated.View style={[animatedStyles, styles.wrapper]}>
        {isLoading && (
          <ActivityIndicator style={StyleSheet.absoluteFillObject} />
        )}
        <Button
          href={SCREENS.City}
          hrefParams={{ city }}
          style={[
            styles.container,
            isLoading && {
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            },
          ]}
          activeOpacity={1}
          rectangle
        >
          <FastImage source={city.image} style={styles.image} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flex: 1,
            }}
          >
            <View>
              <CText numberOfLines={1} style={styles.title}>
                {city.title}
              </CText>
              <CText numberOfLines={1} style={styles.subtitle}>
                {city.country.title}
              </CText>
            </View>

            {!!state.size && <CText numberOfLines={1}>{state.size}</CText>}
          </View>
        </Button>
        <Button style={styles.removeBtn} rectangle onPress={onPurge}>
          <FontAwesome name="trash-o" size={34} color="white" />
        </Button>
      </Animated.View>
    </GesturesContainer>
  );
};

export default observer(OfflineCityItem);

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  container: {
    flex: 1,
    padding: 5,
    paddingHorizontal: 5,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    zIndex: 2,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 6,
    marginRight: 10,
  },
  removeBtn: {
    position: 'absolute',
    right: -80,
    top: 0,
    bottom: 0,
    width: 70,
    height: '100%',
  },
  title: {
    fontFamily: FONTS.OpenSansBold,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
  },
});
