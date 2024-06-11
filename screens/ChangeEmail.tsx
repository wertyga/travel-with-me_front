import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { observer } from 'mobx-react-lite';
import { MainLayout } from '@/Layouts';
import { ChangeEmailForm } from '@/components/Auth';
import { CText } from '@/components/CText';
import { useFocus, useStores } from '@/hooks';
import { SCREENS } from '@/types';

const RecoveryPassword = ({ navigation }) => {
  const { user, changeEmail, isLoading, logout } = useStores(stores => ({
    user: stores.userStore.user,
    changeEmail: stores.authStore.changeEmail,
    isLoading: stores.authStore.isLoading,
    logout: stores.authStore.logout,
  }));

  const onSubmit = async ({ newEmail, password }) => {
    const { success } = await changeEmail({ newEmail, password });
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Check your new e-mail',
      });
      logout();
    }
  };

  useFocus(() => {
    if (!user) {
      navigation.navigate(SCREENS.Login);
    }
  }, [user]);

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

export default observer(RecoveryPassword);
