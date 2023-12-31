import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CText } from '@/components/CText';
import { Icon } from '@/components/Icon';
import cn from '@/app/classname';

import { FOOTER_MENU } from '@/components/FooterMenu/FooterMenu.utils';

import { SCREENS } from '@/types';

export const FooterMenu = () => {
  const navi = useNavigation();

  const redirectTo = (screen: SCREENS) => () => {
    navi.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {FOOTER_MENU.map(({ icon, screen, title }) => {
        return (
          <TouchableOpacity
            key={title}
            style={cn(styles.item)}
            onPress={redirectTo(screen)}
          >
            <Icon name={icon} color="white" />
            <CText style={styles.title}>{title}</CText>
          </TouchableOpacity>
        );
      })}
    </View>
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
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
