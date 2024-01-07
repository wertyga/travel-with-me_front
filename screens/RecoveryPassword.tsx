import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { RecoveryPasswordForm } from '@/components/Auth';
import { Loader } from '@/components/Loader';
import {
  useRecoveryPasswordInitMutation,
  useRecoveryPasswordMutation,
} from '@/api';
import { useAuth } from '@/context';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainLayout } from '@/Layouts';
import { CText } from '@/components/CText';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { SCREENS } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RecoveryPassword'>;

const RecoveryPassword = ({ navigation }: Props) => {
  const { logout } = useAuth();
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
      logout();
      navigation.navigate(SCREENS.Login);
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
    <MainLayout>
      <CityScreenHeader title="Recovery Password" style={styles.header} />

      {isLoading && <Loader />}

      <View style={styles.container}>
        <TouchableOpacity style={styles.goToBtn}>
          <CText>Login</CText>
        </TouchableOpacity>

        <RecoveryPasswordForm onSubmit={onSubmit} codeSent={state.codeSent} />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  header: {
    position: 'relative',
    paddingHorizontal: 0,
  },
  goToBtn: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
});

export default RecoveryPassword;
