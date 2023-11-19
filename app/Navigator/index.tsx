import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/context/AuthContext';
import HomeScreen from '@/screens/Home';
import ErrorScreen from '@/screens/Error';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Error" component={ErrorScreen} />
        {/*{user ? (*/}
        {/*  <Stack.Screen name="Home" component={HomeScreen} />*/}
        {/*) : (*/}
        {/*  <Stack.Screen name="Login" component={LoginScreen} />*/}
        {/*)}*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
