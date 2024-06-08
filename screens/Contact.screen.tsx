import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { MainLayout } from '@/Layouts';
import { REGISTER_FORM_SCHEMA } from '@/components/Auth/SignUpForm/SignUpForm.utils';
import { SubmitBtn } from '@/components/Auth/SubmitBtn/SubmitBtn';
import { Input } from '@/components/Input';
import { useAuthGuard } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';

const ContactScreen = () => {
  useAuthGuard();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(REGISTER_FORM_SCHEMA),
  });

  const onSubmit = data => {
    console.log({ data });
  };

  return (
    <MainLayout headerTitle="Support">
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                inputStyle={styles.textarea}
                multiline
                value={value}
                onChange={onChange}
                placeholder="Message"
                autoCapitalize="none"
                error={errors?.email?.message}
              />
            );
          }}
          name="email"
        />

        <SubmitBtn onPress={handleSubmit(onSubmit)}>Send Request</SubmitBtn>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  textarea: {
    height: 200,
    textAlignVertical: 'top',
  },
});

export default ContactScreen;
