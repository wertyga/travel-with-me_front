import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthContext';
import HomeScreen from '@/screens/Home';
import ErrorScreen from '@/screens/Error';
import LoginScreen from '@/screens/Login';
import RecoveryPasswordScreen from '@/screens/RecoveryPassword';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            key="login-screens"
          />
        ) : (
          <React.Fragment key="main-screens">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Error" component={ErrorScreen} />
          </React.Fragment>
        )}
        <Stack.Screen
          name="RecoveryPassword"
          component={RecoveryPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
