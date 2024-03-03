import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/Input';
import Button from '@/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { CHANGE_EMAIL_FORM_SCHEMA } from '@/components/Auth/ChangeEmailForm/ChangeEmailForm.utils';

type Props = {
  onSubmit: (data: any) => void;
};

export const ChangeEmailForm = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CHANGE_EMAIL_FORM_SCHEMA),
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Controller
          control={control as any}
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                className="mb-4"
                value={value}
                onChange={onChange}
                placeholder="New e-mail"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                error={errors?.newEmail?.message}
              />
            );
          }}
          name="newEmail"
        />
        <Controller
          control={control as any}
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                className="mb-4"
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
      </View>
      <Button high fluid onPress={handleSubmit(onSubmit)}>
        Change E-mail
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  form: {
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },
});
