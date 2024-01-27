import React from 'react';
import { StyleSheet, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { SIGNIN_FORM_SCHEMA } from './SignInForm.utils';
import { Input } from '@/components/Input';
import { SubmitBtn } from '@/components/Auth/SubmitBtn/SubmitBtn';

type Props = {
  onSubmit: (data: any) => void;
};

export const SignInForm = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SIGNIN_FORM_SCHEMA),
  });

  return (
    <View className="flex flex-col items-center w-full">
      <Controller
        control={control as any}
        render={({ field: { onChange, value } }) => {
          return (
            <Input
              style={styles.input}
              value={value}
              onChange={onChange}
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              error={errors?.email?.message}
            />
          );
        }}
        name="email"
      />
      <Controller
        control={control as any}
        render={({ field: { onChange, value } }) => {
          return (
            <Input
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              secureTextEntry
              textContentType="password"
              error={errors?.password?.message}
            />
          );
        }}
        name="password"
      />

      <SubmitBtn onPress={handleSubmit(onSubmit)}>Sign in</SubmitBtn>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
});
