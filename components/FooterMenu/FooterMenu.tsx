import { useEffect } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import { FOOTER_MENU } from '@/components/FooterMenu/FooterMenu.utils';
import { Icon, IconNames } from '@/components/Icon';
import { useNavigation } from '@/hooks';
import { useStores } from '@/hooks';

import { SCREENS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

const FooterMenu = () => {
  const navi = useNavigation();

  const { footer } = useStores(stores => ({
    footer: stores.domStore.footer,
  }));

  const translateY = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    } as any;
  });

  useEffect(() => {
    translateY.value = withTiming(footer.hidden ? 100 : 0);
  }, [footer.hidden]);

  const redirectTo = (screen: SCREENS) => () => {
    navi.navigate(screen);
  };

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <View style={styles.menu}>
        {FOOTER_MENU.map(({ icon, screen, title }) => {
          return (
            <TouchableOpacity
              key={title}
              style={styles.item}
              onPress={redirectTo(screen)}
            >
              {typeof icon === 'string' && (
                <Icon name={icon as IconNames} color="white" />
              )}
              {typeof icon === 'object' && icon}

              <CText style={styles.title}>{title}</CText>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

export default observer(FooterMenu);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingTop: 10,
    paddingBottom: 8,
    height: CONSTANTS.spaces.footerHeight,
    width: '100%',
    backgroundColor: CONSTANTS.colors.bg2,
    zIndex: 200,
  },
  menu: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    width: '25%',
  },
  title: {
    fontSize: 10,
    marginTop: 5,
  },
});
