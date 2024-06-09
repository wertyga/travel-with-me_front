import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRefWithCurrent,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStores } from '@/hooks';
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
import TransitionScreen from '@/screens/TransitionScreen';
import { observer } from 'mobx-react';
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

  const { onRouterStoreReady, initialHistory, isAppSet, isInitialLoading } =
    useStores(stores => ({
      onRouterStoreReady: stores.routerStore.onReady,
      initialHistory: stores.routerStore.initialHistory,
      isAppSet: stores.routerStore.isAppSet,
      isInitialLoading: stores.authStore.isInitialLoading,
    }));

  const onReady = async () => {
    navigation = navigationRef;
    onRouterStoreReady(navigationRef);
  };

  if (isInitialLoading || !isAppSet) {
    return <TransitionScreen />;
  }

  return (
    <NavigationContainer<RootStackParamList>
      ref={navigationRef as any}
      onReady={onReady}
      initialState={initialHistory}
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

export default observer(Navigator);
