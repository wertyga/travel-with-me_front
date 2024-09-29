import React, { useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import { SignInForm, SignUpForm } from '@/components/Auth';
import OauthGoogle from '@/components/Auth/OauthGoogle/OauthGoogle';
import Button from '@/components/Button';
import { Version } from '@/components/Common';
import { useNavigation } from '@/hooks';
import { useStores } from '@/hooks';

import { AuthCommonRequest, SCREENS } from '@/types';

const Login = () => {
  const navigation = useNavigation();
  const { signUp, signIn, isLoading, navigator, user } = useStores(stores => ({
    signIn: stores.authStore.signIn,
    signUp: stores.authStore.signUp,
    isLoading: stores.authStore.isLoading,
    navigator: stores.routerStore.navigator,
    user: stores.userStore.user,
  }));

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
    const isSuccess = await signIn(data);
    if (isSuccess) {
      const routeState = navigator.getState();
      const { name, params } =
        routeState.routes[routeState.routes.length - 2] ||
        routeState.routes[routeState.routes.length - 1];

      navigation.navigate(name as SCREENS, params);
    }
  };

  const { screen } = state;
  const isLogin = screen === 'signin';
  return (
    <MainLayout
      headerTitle={isLogin ? 'Login' : 'Register'}
      isLoading={isLoading}
    >
      <ScrollView style={styles.content}>
        <Button style={styles.goToText} onPress={onChangeForm} textable light>
          {screen === 'signin' ? 'Register' : 'Login'}
        </Button>

        {screen === 'signup' && <SignUpForm onSubmit={onSignUp} />}
        {screen === 'signin' && <SignInForm onSubmit={onSignIn} />}

        <View style={styles.oauth}>
          <OauthGoogle />
        </View>

        <Button
          light
          textable
          href={SCREENS.RecoveryPassword}
          style={styles.forgotText}
        >
          Forgot password?
        </Button>
      </ScrollView>
      <Version />
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
  oauth: {
    marginTop: 30,
  },
});

export default observer(Login);
