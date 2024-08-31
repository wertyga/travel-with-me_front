import React from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  children: React.ReactNode[];
};

export const AchievementWrapper = ({ children }: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.container}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: CONSTANTS.spaces.footerHeight * 2,
  },
  content: {
    gap: 10,
    paddingBottom: CONSTANTS.spaces.footerHeight,
  },
});
