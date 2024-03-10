import {
  Dimensions,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Button from '@/components/Button';
import { FontAwesome } from '@expo/vector-icons';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import cn from '@/app/classname';
import { CText } from '@/components/CText';
import { useNavigation } from '@/hooks';
import { FONTS, SCREENS } from '@/types';
import {
  HeaderMenu,
  HeaderMenuProps,
} from '@/components/City/CityScreenHeader/HeaderMenu';
import { useSelector } from '@/stores';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

type Props = {
  style?: StyleProp<ViewStyle | TextStyle>;
  title: string;
  isDark?: boolean;
  menu?: HeaderMenuProps['menu'];
};

export const CityScreenHeader = ({ style, title, menu, isDark }: Props) => {
  const navi = useNavigation();
  const headerStyles = useSelector(({ domStore }) => domStore?.header);
  const translateY = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    } as any;
  });

  useEffect(() => {
    translateY.value = withTiming(headerStyles?.hidden ? -100 : 0);
  }, [headerStyles?.hidden]);

  const goBack = () => {
    if (navi.canGoBack()) {
      navi.goBack();
    } else {
      navi.navigate(SCREENS.CitiesList);
    }
  };

  const isTitleExceed = title?.length >= 17;
  const { color, ...viewStyle } = style || {};

  return (
    <Animated.View style={[styles.container, viewStyle, animatedStyles]}>
      <Button style={styles.btn} onPress={goBack}>
        <FontAwesome
          name="angle-left"
          size={30}
          color={isDark ? 'black' : 'white'}
        />
      </Button>

      <CText
        style={cn(
          {
            ...styles.title,
            lineHeight: isTitleExceed ? 30 : undefined,
          },
          { [isDark]: styles.dark }
        )}
        numberOfLines={2}
      >
        {title}
      </CText>

      {!!menu && <HeaderMenu items={menu} />}
    </Animated.View>
  );
};

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
