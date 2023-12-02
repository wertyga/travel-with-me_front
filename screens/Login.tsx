import { SafeAreaView, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SignUpForm, SignInForm } from '@/components/Auth';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthCommonRequest } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
  const { signIn, signUp } = useAuth();
  const [state, setState] = useState({
    screen: 'signin',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onChangeForm = () => {
    setState(prev => ({
      ...prev,
      screen: prev.screen === 'signup' ? 'signin' : 'signup',
    }));
  };

  const onSubmit = async (data: AuthCommonRequest) => {
    if (state.screen === 'signup') {
      const isSuccess = await signUp(data);

      if (isSuccess) {
        setState(prev => ({ ...prev, screen: 'signin' }));
      }
    }

    const { user } = await signIn(data);
    if (user) {
      navigation.navigate('Home');
    }
  };

  const { screen } = state;

  return (
    <SafeAreaView>
      <View className="bg-slate-700 px-2 h-full w-full pt-8">
        <Text
          className="text-white text-right mt-2 mr-2"
          onPress={onChangeForm}
        >
          {screen === 'signup' ? 'Sign in' : 'Sign up'}
        </Text>

        {screen === 'signup' && <SignUpForm onSubmit={onSubmit} />}
        {screen === 'signin' && <SignInForm onSubmit={onSubmit} />}

        <Text
          className="text-white text-right mt-2 mr-2"
          onPress={() => navigation.navigate('RecoveryPassword')}
        >
          Forgot password?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
