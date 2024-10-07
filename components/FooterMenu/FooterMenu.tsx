import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { CText } from '@/components/CText';
import { FOOTER_MENU } from '@/components/FooterMenu/FooterMenu.utils';
import { Icon, IconNames } from '@/components/Icon';
import { useNavigation } from '@/hooks';

import { SCREENS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

export const FooterMenu = () => {
  const navi = useNavigation();

  const redirectTo = (screen: SCREENS) => () => {
    navi.navigate(screen);
  };

  return (
    <View style={[styles.container]}>
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
    </View>
  );
};

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
