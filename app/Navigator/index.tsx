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
import { City, SCREENS } from '@/types';

export type RootStackParamList = {
  [SCREENS.Home]: { city?: City; isFromError?: boolean } | undefined;
  [SCREENS.ChangeEmail]: undefined;
  [SCREENS.RecoveryPassword]: undefined;
  [SCREENS.Login]: undefined;
  [SCREENS.Guide]: { guideSlug: string };
  [SCREENS.CitiesList]: undefined;
  [SCREENS.GuideMap]: undefined;
  [SCREENS.Subscriptions]: undefined;
  [SCREENS.Error]: { error: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: Header,
        }}
      >
        <Stack.Screen name={SCREENS.CitiesList} component={CitiesListScreen} />
        <Stack.Screen name={SCREENS.Home} component={HomeScreen} />
        <Stack.Screen name={SCREENS.GuideMap} component={GuideMapScreen} />
        <Stack.Screen name={SCREENS.Guide} component={GuideScreen} />
        <Stack.Screen
          name={SCREENS.Subscriptions}
          component={SubscriptionsScreen}
        />
        <Stack.Screen name={SCREENS.Error} component={ErrorScreen} />
        <Stack.Screen
          name={SCREENS.Login}
          component={LoginScreen}
          key="login-screens"
        />
        <Stack.Screen
          name={SCREENS.RecoveryPassword}
          component={RecoveryPasswordScreen}
        />
        <Stack.Screen
          name={SCREENS.ChangeEmail}
          component={ChangeEmailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
