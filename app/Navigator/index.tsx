import React, { useEffect } from 'react';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { observer } from 'mobx-react-lite';

import { onLineScreens } from '@/app/Navigator/navigator.utils';
import { useStores } from '@/hooks';
import TransitionScreen from '@/screens/TransitionScreen';

import { RootStackParamList, SCREENS } from '@/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const navigationRef = useNavigationContainerRef();

  const { onRouterStoreReady, isAuthLoading, isNetConnected } = useStores(
    stores => ({
      onRouterStoreReady: stores.routerStore.onReady,
      isAuthLoading: stores.authStore.isInitialLoading,
      isNetConnected: stores.appStateStore.isNetConnected,
    })
  );

  const onReady = async () => {
    onRouterStoreReady(navigationRef);

    if (!isNetConnected) {
      navigationRef.current.navigate(SCREENS.CitiesList as never);
    }
  };

  useEffect(() => {
    if (isNetConnected || !navigationRef.current) return;

    navigationRef.current.navigate(SCREENS.CitiesList as never);
  }, [isNetConnected]);

  if (isAuthLoading) {
    return <TransitionScreen />;
  }

  return (
    <NavigationContainer<RootStackParamList>
      ref={navigationRef as any}
      onReady={onReady}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {onLineScreens.map(route => {
          return (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default observer(Navigator);
