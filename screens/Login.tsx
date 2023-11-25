import { SafeAreaView, Text } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SignUpForm, SignInForm } from '@/components/Auth';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navi = useNavigation();
  const { signIn, signUp } = useAuth();
  const [state, setState] = useState({
    screen: 'signup',
  });

  useLayoutEffect(() => {
    navi.setOptions({
      headerShown: false,
    });
  }, []);

  const onChangeForm = () => {
    setState(prev => ({
      ...prev,
      screen: prev.screen === 'signup' ? 'signin' : 'signup',
    }));
  };

  const onSubmit = async data => {
    if (state.screen === 'signup') {
      const isSuccess = await signUp(data);

      if (isSuccess) {
        setState(prev => ({ ...prev, screen: 'signin' }));
      }
    }

    return signIn(data);
  };

  const { screen } = state;

  return (
    <SafeAreaView className="bg-slate-700 px-2 h-full w-full pt-8">
      <Text className="text-white text-right mt-2 mr-2" onPress={onChangeForm}>
        {screen === 'signup' ? 'Sign in' : 'Sign up'}
      </Text>
      {screen === 'signup' && <SignUpForm onSubmit={onSubmit} />}
      {screen === 'signin' && <SignInForm onSubmit={onSubmit} />}
    </SafeAreaView>
  );
};

export default Login;
