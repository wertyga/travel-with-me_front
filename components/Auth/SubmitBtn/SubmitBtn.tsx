import React from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';

import { CText } from '@/components/CText';

import { FONTS } from '@/types';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  onPress: () => void;
  children: string;
};

export const SubmitBtn = ({ onPress, children }: Props) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={onPress}>
      <CText style={styles.submitText}>{children}</CText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F5F2',
    borderRadius: 10,
    marginTop: 20,
  },
  submitText: {
    color: CONSTANTS.colors.bgDarkest,
    fontFamily: FONTS.OpenSansBold,
  },
});
