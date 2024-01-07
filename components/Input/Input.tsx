import React from 'react';
import cn from '@/app/classname';
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { CONSTANTS } from '@/styles/constants';

type Props = TextInputProps & {
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
    <View style={cn(styles.container, style)}>
      <TextInput
        onChangeText={onChange}
        style={cn(styles.input, inputStyle)}
        placeholderTextColor={CONSTANTS.colors.bgDark}
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
