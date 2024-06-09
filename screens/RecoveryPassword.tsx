import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MainLayout } from '@/Layouts';
import { RecoveryPasswordForm } from '@/components/Auth';
import Button from '@/components/Button';
import { useNavigation, useStores } from '@/hooks';
import { observer } from 'mobx-react';
import { SCREENS } from '@/types';

const RecoveryPassword = () => {
  const navi = useNavigation();

  const { logout, recoveryPasswordInit, recoveryPassword, isLoading } =
    useStores(stores => ({
      logout: stores.authStore.logout,
      recoveryPasswordInit: stores.authStore.recoveryPasswordInit,
      recoveryPassword: stores.authStore.recoveryPassword,
      isLoading: stores.authStore.isLoading,
    }));

  const [state, setState] = useState({
    codeSent: false,
  });

  const onRecoveryInit = async ({ email }) => {
    const { success } = await recoveryPasswordInit({ email });
    if (success) {
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
    const { success } = await recoveryPassword({
      email,
      token: code,
      password,
    });

    if (success) {
      setState(prev => ({ ...prev, codeSent: false }));
      await logout();

      navi.replace(SCREENS.Login);
    }
  };

  const onSubmit = ({
    refetch,
    ...data
  }: {
    refetch: boolean;
    email: string;
    code: string;
    password: string;
  }) => {
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

export default observer(RecoveryPassword);
