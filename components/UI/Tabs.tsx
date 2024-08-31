import React, { useState } from 'react';

import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import Animate, { FadeInDown, FadeOut } from 'react-native-reanimated';

import { CText } from '@/components/CText';

type Props = {
  tabs: string[];
  children: React.ReactNode[];
  style?: ViewStyle;
  tabStyle?: ViewStyle;
};

export const Tabs = ({ tabs, children, style, tabStyle }: Props) => {
  const [chosenIndex, setChosenIndex] = useState<number>(0);

  return (
    <View style={style}>
      <View style={styles.tabs}>
        {tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setChosenIndex(i)}
              style={[
                styles.tab,
                {
                  width: `${100 / tabs.length}%`,
                },
                tabStyle,
              ]}
            >
              <CText style={styles.tabText}>{tab}</CText>
              {chosenIndex === i && (
                <Animate.View
                  entering={FadeInDown}
                  exiting={FadeOut}
                  style={styles.slider}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <View>{children[chosenIndex]}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 5,
  },
  tab: {
    position: 'relative',
  },
  tabText: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  tabActive: {},
  slider: {
    height: 2,
    marginTop: 3,
    borderRadius: 3,
    marginRight: 3,
    marginLeft: 3,
    backgroundColor: 'white',
  },
});
