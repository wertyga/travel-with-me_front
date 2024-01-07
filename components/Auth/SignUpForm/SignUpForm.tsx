import React from 'react';
import { StyleSheet, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { REGISTER_FORM_SCHEMA } from './SignUpForm.utils';
import { Input } from '@/components/Input';
import { SubmitBtn } from '@/components/Auth/SubmitBtn/SubmitBtn';

type Props = {
  onSubmit: (data: any) => void;
};

export const SignUpForm = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(REGISTER_FORM_SCHEMA),
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control as any}
        render={({ field: { onChange, value } }) => {
          return (
            <Input
              style={styles.input}
              value={value}
              onChange={onChange}
              placeholder="E-mail"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
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
              onChange={onChange}
              placeholder="Username"
              error={errors?.username?.message}
            />
          );
        }}
        name="username"
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
      <Controller
        control={control as any}
        render={({ field: { onChange, value } }) => {
          return (
            <Input
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Confirm password"
              secureTextEntry
              textContentType="password"
              error={errors?.confirmPassword?.message}
            />
          );
        }}
        name="confirmPassword"
      />

      <SubmitBtn onPress={handleSubmit(onSubmit)}>Sign up</SubmitBtn>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    marginBottom: 15,
  },
});
