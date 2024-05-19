import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CText } from '@/components/CText';
import { FOOTER_MENU } from '@/components/FooterMenu/FooterMenu.utils';
import { Icon, IconNames } from '@/components/Icon';
import { useNavigation } from '@/hooks';
import { useSelector } from '@/stores';
import { SCREENS } from '@/types';

export const FooterMenu = () => {
  const navi = useNavigation();
  const footerStyles = useSelector(({ domStore }) => domStore?.footer);
  const translateY = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    } as any;
  });

  useEffect(() => {
    translateY.value = withTiming(footerStyles?.hidden ? 100 : 0);
  }, [footerStyles?.hidden]);

  const redirectTo = (screen: SCREENS) => () => {
    navi.navigate(screen);
  };

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 8,
    height: 60,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 200,
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
