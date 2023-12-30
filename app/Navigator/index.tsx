import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/Home';
import ErrorScreen from '@/screens/Error';
import LoginScreen from '@/screens/Login';
import RecoveryPasswordScreen from '@/screens/RecoveryPassword';
import GuideScreen from '@/screens/Guide';
import GuideMapScreen from '@/screens/GuideMapScreen';
import ChangeEmailScreen from '@/screens/ChangeEmail';
import SubscriptionsScreen from '@/screens/Subscriptions';
import CitiesListScreen from '@/screens/CitiesListScreen';
import { Header } from '@/components/Header';
import { City } from '@/types';

export type RootStackParamList = {
  Home: { city?: City; isFromError?: boolean } | undefined;
  ChangeEmail: undefined;
  RecoveryPassword: undefined;
  Login: undefined;
  Guide: { guideSlug: string };
  CitiesList: undefined;
  GuideMap: undefined;
  Subscriptions: undefined;
  Error: { error: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: Header,
        }}
        initialRouteName="CitiesList"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GuideMap" component={GuideMapScreen} />
        <Stack.Screen name="CitiesList" component={CitiesListScreen} />
        <Stack.Screen name="Guide" component={GuideScreen} />
        <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
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
