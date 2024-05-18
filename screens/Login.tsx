import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { MainLayout } from '@/Layouts';
import { SignInForm, SignUpForm } from '@/components/Auth';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@/hooks';
import { AuthCommonRequest, SCREENS } from '@/types';

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
        <Button style={styles.goToText} onPress={onChangeForm} textable>
          <CText>{screen === 'signin' ? 'Register' : 'Login'}</CText>
        </Button>

        {screen === 'signup' && <SignUpForm onSubmit={onSignUp} />}
        {screen === 'signin' && <SignInForm onSubmit={onSignIn} />}

        <Button
          textable
          href={SCREENS.RecoveryPassword}
          style={styles.forgotText}
        >
          Forgot password?
        </Button>
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
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});

export default Login;
