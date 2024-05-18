import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainLayout } from '@/Layouts';
import {
  useRecoveryPasswordInitMutation,
  useRecoveryPasswordMutation,
} from '@/api';
import { RootStackParamList } from '@/app/Navigator';
import { RecoveryPasswordForm } from '@/components/Auth';
import Button from '@/components/Button';
import { useAuth } from '@/context';
import { SCREENS } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RecoveryPassword'>;

const RecoveryPassword = ({ navigation }: Props) => {
  const { logout, setBackScreen } = useAuth();
  const [state, setState] = useState({
    codeSent: false,
  });

  const [changeInit, { isLoading: initLoading }] =
    useRecoveryPasswordInitMutation();
  const [changePassword, { isLoading: changeLoading, error }] =
    useRecoveryPasswordMutation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onRecoveryInit = async ({ email }) => {
    const { data } = await changeInit({ email });
    if (data?.success) {
      setState(prev => ({ ...prev, codeSent: true }));
    }
  };

  const onRecovery = async ({
    email,
    code,
    password,
  }: {
    email: string;
    code: string;
    password: string;
  }) => {
    const { data } = await changePassword({ email, token: code, password });
    if (data?.success) {
      setState(prev => ({ ...prev, codeSent: false }));
      setBackScreen(SCREENS.Login);
      logout();
    }
  };

  const onSubmit = ({ refetch, ...data }) => {
    if (refetch) {
      onRecoveryInit(data);
      return;
    }
    if (state.codeSent) {
      onRecovery(data);
      return;
    }

    onRecoveryInit(data);
  };

  const isLoading = initLoading || changeLoading;

  return (
    <MainLayout headerTitle="Recovery Password" isLoading={isLoading}>
      <View style={styles.container}>
        <Button fluid textable style={styles.goToBtn} href={SCREENS.Login}>
          Login
        </Button>

        <RecoveryPasswordForm onSubmit={onSubmit} codeSent={state.codeSent} />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  header: {
    position: 'relative',
    paddingHorizontal: 0,
  },
  goToBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default RecoveryPassword;
