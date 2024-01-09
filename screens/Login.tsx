import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SignUpForm, SignInForm } from '@/components/Auth';
import { RootStackParamList } from '@/app/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthCommonRequest, SCREENS } from '@/types';
import { MainLayout } from '@/Layouts';
import { CityScreenHeader } from '@/components/City/CityScreenHeader/CityScreenHeader';
import { CText } from '@/components/CText';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation, route }: Props) => {
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
      console.log({ route });
      navigation.navigate(SCREENS.CitiesList);
      // navigation.navigate(SCREENS.CitiesList);
    }
  };

  const { screen } = state;
  const isLogin = screen === 'signin';
  return (
    <MainLayout>
      <CityScreenHeader
        title={isLogin ? 'Login' : 'Register'}
        style={styles.header}
      />
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.goToText} onPress={onChangeForm}>
          <CText>{screen === 'signin' ? 'Register' : 'Login'}</CText>
        </TouchableOpacity>

        {screen === 'signup' && <SignUpForm onSubmit={onSubmit} />}
        {screen === 'signin' && <SignInForm onSubmit={onSubmit} />}

        <Text
          className="text-white text-right mt-2 mr-2"
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
    marginTop: 70,
  },
  goToText: {
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: 10,
  },
});

export default Login;
