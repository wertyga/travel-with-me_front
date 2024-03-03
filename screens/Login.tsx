import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SignUpForm, SignInForm } from '@/components/Auth';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthCommonRequest, SCREENS } from '@/types';
import { MainLayout } from '@/Layouts';
import { CText } from '@/components/CText';
import { useNavigation } from '@/hooks';

const Login = () => {
  const navigation = useNavigation();
  const { signIn, signUp, sigUpLoading, sigInLoading } = useAuth();
  const [state, setState] = useState({
    screen: 'signin',
  });

  const onChangeForm = () => {
    setState(prev => ({
      ...prev,
      screen: prev.screen === 'signup' ? 'signin' : 'signup',
    }));
  };

  const onSignUp = async (data: AuthCommonRequest) => {
    const isSuccess = await signUp(data);

    if (isSuccess) {
      setState(prev => ({ ...prev, screen: 'signin' }));
    }
  };

  const onSignIn = async (data: AuthCommonRequest) => {
    const { user } = await signIn(data);
    if (user) {
      navigation.navigate(SCREENS.CitiesList);
    }
  };

  const { screen } = state;
  const isLogin = screen === 'signin';
  const isLoading = sigUpLoading || sigInLoading;
  return (
    <MainLayout
      headerTitle={isLogin ? 'Login' : 'Register'}
      isLoading={isLoading}
    >
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.goToText} onPress={onChangeForm}>
          <CText>{screen === 'signin' ? 'Register' : 'Login'}</CText>
        </TouchableOpacity>

        {screen === 'signup' && <SignUpForm onSubmit={onSignUp} />}
        {screen === 'signin' && <SignInForm onSubmit={onSignIn} />}

        <Text
          className="text-white text-right mt-4 mr-2"
          onPress={() => navigation.navigate(SCREENS.RecoveryPassword)}
        >
          Forgot password?
        </Text>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    paddingHorizontal: 0,
  },
  content: {
    marginTop: 30,
  },
  goToText: {
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: 20,
  },
});

export default Login;
