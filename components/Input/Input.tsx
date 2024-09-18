import React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { CONSTANTS } from '@/styles/constants';

type Props = Omit<TextInputProps, 'error' | 'onChangeText'> & {
  onChange: (value: string) => void;
  error?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
};

export const Input = ({
  onChange,
  error,
  style,
  inputStyle,
  ...inputProps
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor={CONSTANTS.colors.bgDarkest}
        onChangeText={onChange}
        {...inputProps}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 42,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(246, 245, 242, 0.40)',
    color: 'white',
  },
  error: {
    color: 'white',
    fontSize: 10,
    marginTop: 3,
  },
});
