import { SafeAreaView, View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useGetCountriesQuery } from '../api';

import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();

  const { data: { countries = [] } = {} } = useGetCountriesQuery();

  const handleLogin = () => {
    setUser({ username, password });
  };

  return (
    <SafeAreaView className="bg-slate-700 px-2 h-full w-full">
      <Text className="text-2xl text-white p-4 mt-2 text-center font-bold">
        Please Login
      </Text>
      <View className="flex flex-col items-center mt-4">
        <TextInput
          className="text-2xl text-white text-center p-2 w-1/2"
          style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}
          value={username}
          onChange={setUsername}
          placeholder="username"
        />
        <TextInput
          className="text-2xl text-white text-center mt-6 p-2 w-1/2"
          style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}
          value={password}
          onChange={setPassword}
          placeholder="password"
        />
        <Button className="mt-10" onPress={handleLogin}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;
