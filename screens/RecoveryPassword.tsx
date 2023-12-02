import { SafeAreaView, View } from 'react-native';
import { useLayoutEffect, useState } from 'react';
import { RecoveryPasswordForm } from '@/components/Auth';
import { Loader } from '@/components/Loader';
import {
  useRecoveryPasswordInitMutation,
  useRecoveryPasswordMutation,
} from '@/api';
import { useAuth } from '@/context';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
      navigation.navigate('Login');
    }
  };

  const isLoading = initLoading || changeLoading;

  return (
    <SafeAreaView>
      {isLoading && <Loader />}

      <View className="w-screen h-screen bg-slate-700 px-2 h-full w-full pt-8">
        <RecoveryPasswordForm
          onSubmit={state.codeSent ? onRecovery : onRecoveryInit}
          codeSent={state.codeSent}
        />
      </View>
    </SafeAreaView>
  );
};

export default RecoveryPassword;
