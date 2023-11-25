import React from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';

type Props = TextInputProps & {
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  inputClassName?: string;
};

export const Input = ({
  onChange,
  error,
  className = '',
  inputClassName = '',
  ...inputProps
}: Props) => {
  return (
    <View className={`w-full relative ${className}`}>
      <TextInput
        className={`text-2xl text-white text-center p-2 w-1/2 w-full border-b-[1px] border-white ${inputClassName}`}
        onChangeText={onChange}
        {...inputProps}
      />
      {!!error && (
        <Text className="absolute -bottom-1 w-full l-0 text-center text-red-400 text-[12px]">
          {error}
        </Text>
      )}
    </View>
  );
};
