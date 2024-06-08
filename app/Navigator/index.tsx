import React, { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import {
  NavigationContainer,
  NavigationContainerRefWithCurrent,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/context';
import ChangeEmailScreen from '@/screens/ChangeEmail';
import CitiesListScreen from '@/screens/CitiesList.screen';
import CityScreen from '@/screens/City.screen';
import ContactScreen from '@/screens/Contact.screen';
import ErrorScreen from '@/screens/Error';
import FavoritesScreen from '@/screens/Favorites.screen';
import GuideScreen from '@/screens/Guide.screen';
import GuideMapScreen from '@/screens/GuideMap.screen';
import LoginScreen from '@/screens/Login';
import PlaceScreen from '@/screens/Place.screen';
import ProfileScreen from '@/screens/Profile';
import RecoveryPasswordScreen from '@/screens/RecoveryPassword';
import SubscriptionsScreen from '@/screens/Subscriptions';
import TestScreen from '@/screens/Test.screen';
import TransitionScreen from '@/screens/TransitionScreen';
import WorldGuidesMap from '@/screens/WorldGuidesMap';
import { updateCurrentRoute } from '@/stores';
import { storage } from '@/utils';
import { City, Guide, SCREENS } from '@/types';

export type RootStackParamList = {
  [SCREENS.City]: { city?: City; isFromError?: boolean } | undefined;
  [SCREENS.ChangeEmail]: undefined;
  [SCREENS.RecoveryPassword]: undefined;
  [SCREENS.Login]: undefined;
  [SCREENS.Guide]: { guide: Guide };
  [SCREENS.CitiesList]: undefined;
  [SCREENS.GuideMap]: { guideSlug: string; isOnlyMap?: boolean };
  [SCREENS.Subscriptions]: undefined;
  [SCREENS.Favorite]: undefined;
  [SCREENS.Profile]: undefined;
  [SCREENS.WorldGuidesMap]: undefined;
  [SCREENS.Contact]: undefined;
  [SCREENS.Place]: { placeSlug: string; autoplay?: boolean };
  [SCREENS.Error]: { error: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export let navigation: NavigationContainerRefWithCurrent<any> | undefined;

const Navigator = () => {
  const navigationRef = useNavigationContainerRef();

  const { isLoading } = useAuth();

  const [initialHistory, setInitialHistory] = useState(undefined);
  const [isAppSet, setIsAppSet] = useState(true);

  const addRouteListener = () => {
    navigationRef?.addListener('state', ({ data: { state } }) => {
      const { name, params } = state.routes[state.routes.length - 1];
      updateCurrentRoute({ [name]: params } as any);

      storage.set('routeHistory', state);
    });
  };

  const onReady = async () => {
    navigation = navigationRef;
    addRouteListener();
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextState => {
        if (nextState === 'active') {
          const history = await storage.get('routeHistory');
          setInitialHistory(history);

          setTimeout(() => {
            setIsAppSet(true);
          });
        }

        if (nextState === 'background') {
          setIsAppSet(false);
        }
      }
    );
  }, []);

  if (isLoading || !isAppSet) {
    return <TransitionScreen />;
  }

  return (
    <NavigationContainer<RootStackParamList>
      ref={navigationRef}
      onReady={onReady}
      initialState={initialHistory}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/*<Stack.Screen name={SCREENS.CitiesList} component={TestScreen} />*/}
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
        <Stack.Screen name={SCREENS.Contact} component={ContactScreen} />
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
