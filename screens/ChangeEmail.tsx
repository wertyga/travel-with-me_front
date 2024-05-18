import { useCallback, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { MainLayout } from '@/Layouts';
import { useChangeEmailMutation } from '@/api';
import { RootStackParamList } from '@/app/Navigator';
import { ChangeEmailForm } from '@/components/Auth';
import { CText } from '@/components/CText';
import { Loader } from '@/components/Loader';
import { useAuth } from '@/context';
import { SCREENS } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangeEmail'>;

const RecoveryPassword = ({ navigation }: Props) => {
  const { user } = useAuth();

  const [changeEmail, { isLoading }] = useChangeEmailMutation();

  const onSubmit = async ({ newEmail, password }) => {
    const { data } = await changeEmail({ newEmail, password });
    if (data?.success) {
      Toast.show({
        type: 'success',
        text1: 'Check your new e-mail',
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        navigation.navigate(SCREENS.Login);
      }
    }, [user])
  );

  return (
    <MainLayout headerTitle="Change E-mail" isLoading={isLoading}>
      <CText style={styles.title}>Enter confirmation number</CText>
      <ChangeEmailForm onSubmit={onSubmit} />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
  },
});

export default RecoveryPassword;
