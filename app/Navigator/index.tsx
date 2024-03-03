import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRefWithCurrent,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CityScreen from '@/screens/City.screen';
import ErrorScreen from '@/screens/Error';
import LoginScreen from '@/screens/Login';
import RecoveryPasswordScreen from '@/screens/RecoveryPassword';
import GuideScreen from '@/screens/Guide.screen';
import GuideMapScreen from '@/screens/GuideMap.screen';
import ChangeEmailScreen from '@/screens/ChangeEmail';
import SubscriptionsScreen from '@/screens/Subscriptions';
import CitiesListScreen from '@/screens/CitiesList.screen';
import PlaceScreen from '@/screens/Place.screen';
import ProfileScreen from '@/screens/Profile';
import WorldGuidesMap from '@/screens/WorldGuidesMap';
import TransitionScreen from '@/screens/TransitionScreen';
import FavoritesScreen from '@/screens/Favorites.screen';
import { useAuth } from '@/context';
import { City, SCREENS } from '@/types';

export type RootStackParamList = {
  [SCREENS.City]: { city?: City; isFromError?: boolean } | undefined;
  [SCREENS.ChangeEmail]: undefined;
  [SCREENS.RecoveryPassword]: undefined;
  [SCREENS.Login]: undefined;
  [SCREENS.Guide]: { guideSlug: string };
  [SCREENS.CitiesList]: undefined;
  [SCREENS.GuideMap]: { guideSlug: string; isOnlyMap?: boolean };
  [SCREENS.Subscriptions]: undefined;
  [SCREENS.Favorite]: undefined;
  [SCREENS.Profile]: undefined;
  [SCREENS.WorldGuidesMap]: undefined;
  [SCREENS.Place]: { placeSlug: string; autoplay?: boolean };
  [SCREENS.Error]: { error: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export let navigation: NavigationContainerRefWithCurrent<any> | undefined;

const Navigator = () => {
  const navigationRef = useNavigationContainerRef();
  const { isLoading, backScreen, setBackScreen } = useAuth();

  if (isLoading) {
    return <TransitionScreen />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        navigation = navigationRef;

        if (backScreen) {
          navigationRef.navigate(backScreen as any);
          setBackScreen();
        }
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={SCREENS.CitiesList} component={CitiesListScreen} />
        <Stack.Screen name={SCREENS.City} component={CityScreen} />
        <Stack.Screen name={SCREENS.Profile} component={ProfileScreen} />
        <Stack.Screen name={SCREENS.Place} component={PlaceScreen} />
        <Stack.Screen name={SCREENS.GuideMap} component={GuideMapScreen} />
        <Stack.Screen name={SCREENS.Guide} component={GuideScreen} />
        <Stack.Screen
          name={SCREENS.WorldGuidesMap}
          component={WorldGuidesMap}
        />
        <Stack.Screen
          name={SCREENS.Subscriptions}
          component={SubscriptionsScreen}
        />
        <Stack.Screen name={SCREENS.Error} component={ErrorScreen} />
        <Stack.Screen name={SCREENS.Login} component={LoginScreen} />
        <Stack.Screen name={SCREENS.Favorite} component={FavoritesScreen} />
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
