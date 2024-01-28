import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Button from '@/components/Button';
import cn from '@/app/classname';
import { CText } from '@/components/CText';
import { Feather } from '@expo/vector-icons';
import { SCREENS } from '@/types';

export type MenuItem = {
  title: React.ReactNode;
};

export type HeaderMenuProps = {
  items: MenuItem[];
};

export const HeaderMenu = ({ items }: HeaderMenuProps) => {
  const [state, setState] = useState({
    isOpened: false,
  });

  const toggleOpen = (value?: boolean) => () => {
    setState(prev => ({
      ...prev,
      isOpened: value !== undefined ? value : !prev.isOpened,
    }));
  };

  return (
    <View style={styles.container}>
      <Button
        style={cn(styles.btn, { [state.isOpened]: styles.openedMenu })}
        rectangle
        noPaddings
        onPress={toggleOpen()}
        activeOpacity={1}
      >
        <Feather name="menu" size={24} color="white" />
      </Button>

      {state.isOpened && (
        <View style={cn(styles.menu)}>
          {items.map((item, i) => {
            return <View key={i}>{item.title}</View>;
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  btn: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(12, 85, 91, 0.7)',
  },
  openedMenu: {},
  menu: {
    position: 'absolute',
    top: 10,
    right: 0,
    gap: 10,
    width: Dimensions.get('window').width - 30,
    transform: [{ translateY: 40 }],
    backgroundColor: 'rgba(12, 85, 91, 0.7)',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});
