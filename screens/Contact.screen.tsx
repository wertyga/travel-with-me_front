import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import { MainLayout } from '@/Layouts';
import { sendHelpMessage } from '@/api';
import { SubmitBtn } from '@/components/Auth/SubmitBtn/SubmitBtn';
import { Input } from '@/components/Input';
import { useAuthGuard } from '@/hooks';

const ContactScreen = () => {
  useAuthGuard();

  const { handleSubmit, control, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ message }) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { success } = await sendHelpMessage({ message });

      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Message sent. We will contact with you by e-mail',
        });
        reset();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout headerTitle="Support" isLoading={isLoading} withBackButton>
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
              />
            );
          }}
          name="message"
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
    padding: 5,
  },
});

export default ContactScreen;
