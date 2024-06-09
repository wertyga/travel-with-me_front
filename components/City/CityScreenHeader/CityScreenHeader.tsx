import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { FontAwesome } from '@expo/vector-icons';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import {
  HeaderMenu,
  HeaderMenuProps,
} from '@/components/City/CityScreenHeader/HeaderMenu';
import { useNavigation } from '@/hooks';
import { useStores } from '@/hooks';
import { observer } from 'mobx-react';
import { FONTS, SCREENS } from '@/types';

type Props = {
  style?: StyleProp<ViewStyle | TextStyle>;
  title: string;
  isDark?: boolean;
  noBackBtn?: boolean;
  menu?: HeaderMenuProps['items'];
};

export const CityScreenHeaderComponent = ({
  style,
  title,
  menu,
  isDark,
  noBackBtn,
}: Props) => {
  const navi = useNavigation();
  const { header } = useStores(stores => ({
    header: stores.domStore.header,
  }));

  const translateY = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    } as any;
  });

  useEffect(() => {
    translateY.value = withTiming(header.hidden ? -150 : 0);
  }, [header.hidden]);

  const goBack = () => {
    if (navi.canGoBack()) {
      navi.goBack();
    } else {
      navi.navigate(SCREENS.CitiesList);
    }
  };

  const { color, ...viewStyle } = style || ({} as any);

  return (
    <Animated.View style={[styles.container, viewStyle, animatedStyles]}>
      {!noBackBtn && (
        <Button style={styles.btn} onPress={goBack}>
          <FontAwesome
            name="angle-left"
            size={30}
            color={isDark ? 'black' : 'white'}
          />
        </Button>
      )}

      <CText style={[styles.title, isDark && styles.dark]} numberOfLines={2}>
        {title}
      </CText>

      {!!menu && <HeaderMenu items={menu} />}
    </Animated.View>
  );
};

export const CityScreenHeader = observer(CityScreenHeaderComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    zIndex: 10,
  },
  btn: {
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTS.CrimsonBold,
    fontSize: 30,
    textAlign: 'center',
    marginHorizontal: 5,
    width: Dimensions.get('window').width - 120, // 40 + 40 - buttons + paddingHorizontal * 2 * 15 + marginHorizontal * 2 * 10
  },
  dark: {
    color: 'black',
  },
  hide: {
    opacity: 0,
  },
});
