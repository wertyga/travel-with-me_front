import React from 'react';
import { Text, View } from 'react-native';
import Button from '@/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { SIGNIN_FORM_SCHEMA } from './SignInForm.utils';
import { Input } from '@/components/Input';

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
    <View>
      <Text className="text-2xl text-white p-4 mt-2 text-center font-bold">
        Sign In
      </Text>
      <View className="flex flex-col items-center mt-4 w-full">
        <Controller
          control={control as any}
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                className="mb-4"
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

        <Button className="mt-10" onPress={handleSubmit(onSubmit)}>
          Sign in
        </Button>
      </View>
    </View>
  );
};
