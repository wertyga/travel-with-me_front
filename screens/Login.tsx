import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import React, { useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const { signIn } = useAuth();

  const onChange =
    (key: keyof typeof state) =>
    ({
      nativeEvent: { text },
    }: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setState(prev => ({ ...prev, [key]: text }));
    };

  const handleLogin = () => {
    signIn(state.email, state.password);
  };

  return (
    <SafeAreaView className="bg-slate-700 px-2 h-full w-full">
      <Text className="text-2xl text-white p-4 mt-2 text-center font-bold">
        Please Login
      </Text>
      <View className="flex flex-col items-center mt-4 w-full">
        <TextInput
          className="text-2xl text-white text-center p-2 w-1/2"
          style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}
          value={state.email}
          onChange={onChange('email')}
          placeholder="E-mail"
          autoFocus
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TextInput
          className="text-2xl text-white text-center mt-6 p-2 w-1/2"
          style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}
          value={state.password}
          onChange={onChange('password')}
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <Button className="mt-10" onPress={handleLogin}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;
