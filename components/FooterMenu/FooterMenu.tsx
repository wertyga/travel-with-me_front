import { useEffect } from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';

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
      {FOOTER_MENU.map(({ icon, screen, title, iconSize }) => {
        return (
          <TouchableOpacity
            key={title}
            style={styles.item}
            onPress={redirectTo(screen)}
          >
            {typeof icon === 'string' && (
              <Icon
                name={icon as IconNames}
                color={CONSTANTS.colors.typographyLight}
                size={iconSize}
              />
            )}
            {typeof icon === 'object' && icon}

            <CText style={styles.title} light>
              {title}
            </CText>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

export default observer(FooterMenu);

const styles = StyleSheet.create({
  container: {
    height: CONSTANTS.spaces.footerHeight,
    width: '100%',
    backgroundColor: CONSTANTS.colors.footerColor,
    zIndex: CONSTANTS.indexes.footerZIndex,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CONSTANTS.spaces.paddingHorizontal,
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
