import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/Home';
import ErrorScreen from '@/screens/Error';
import LoginScreen from '@/screens/Login';
import RecoveryPasswordScreen from '@/screens/RecoveryPassword';
import GuideScreen from '@/screens/Guide';
import ChangeEmailScreen from '@/screens/ChangeEmail';

import { Header } from '@/components/Header';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: props => <Header {...props} />,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          // options={{ headerTitle: props => <Header {...props} /> }}
        />
        <Stack.Screen name="Guide" component={GuideScreen} />
        <Stack.Screen name="Error" component={ErrorScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          key="login-screens"
        />
        <Stack.Screen
          name="RecoveryPassword"
          component={RecoveryPasswordScreen}
        />
        <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
