import { Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/Input';
import Button from '@/components/Button';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { getRecoveryPasswordSchema } from './RecoveryPasswordForm.utils';

type Props = {
  onSubmit: (data: any) => void;
  codeSent?: boolean;
};

export const RecoveryPasswordForm = ({ onSubmit, codeSent }: Props) => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getRecoveryPasswordSchema(codeSent)),
  });

  const goSubmit = (refetch?: boolean) => data => {
    if (codeSent && !data.code && !refetch) {
      setError('code', { message: 'This field is required' });
      return;
    }
    return onSubmit(data);
  };

  return (
    <View>
      <Text className="text-2xl text-white p-4 mt-2 text-center font-bold">
        Recovery password
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
        {codeSent && (
          <>
            <Controller
              control={control as any}
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    className="mb-4"
                    value={value}
                    onChange={onChange}
                    placeholder="Your code here"
                    autoCapitalize="none"
                    error={errors?.code?.message}
                  />
                );
              }}
              name="code"
            />
            <Controller
              control={control as any}
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    className="mb-4"
                    value={value}
                    onChange={onChange}
                    placeholder="Password"
                    autoCapitalize="none"
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
                    className="mb-4"
                    value={value}
                    onChange={onChange}
                    placeholder="Confirm your password"
                    autoCapitalize="none"
                    secureTextEntry
                    textContentType="password"
                    error={errors?.confirmPassword?.message}
                  />
                );
              }}
              name="confirmPassword"
            />
          </>
        )}

        <Button className="mt-10" onPress={handleSubmit(goSubmit())}>
          {codeSent ? 'Change password' : 'Send request'}
        </Button>
        {codeSent && (
          <Text
            onPress={handleSubmit(goSubmit(true))}
            className="text-white mt-3 text-right"
          >
            Send again
          </Text>
        )}
      </View>
    </View>
  );
};
