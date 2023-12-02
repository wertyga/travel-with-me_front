import { SafeAreaView, View, Text } from 'react-native';
import { useCallback, useLayoutEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ChangeEmailForm } from '@/components/Auth';
import { Loader } from '@/components/Loader';
import { useChangeEmailMutation } from '@/api';
import { useAuth } from '@/context';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
        navigation.navigate('Login');
      }
    }, [user])
  );

  return (
    <SafeAreaView>
      {isLoading && <Loader />}

      <View className="w-screen h-screen bg-slate-700 px-2 h-full w-full pt-8">
        <ChangeEmailForm onSubmit={onSubmit} />
        <Text
          onPress={() => navigation.navigate('Home')}
          className="pt-2 text-white text-right"
        >
          Go to home
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RecoveryPassword;
