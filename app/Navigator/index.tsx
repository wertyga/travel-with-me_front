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

import { getIsNetConnected } from '@/utils/etc';

import { RootStackParamList, SCREENS } from '@/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const navigationRef = useNavigationContainerRef();

  const {
    onRouterStoreReady,
    isAuthLoading,
    isNetConnected,
    getCityLightList,
    cityLightList,
  } = useStores(stores => ({
    onRouterStoreReady: stores.routerStore.onReady,
    isAuthLoading: stores.authStore.isInitialLoading,
    isNetConnected: stores.appStateStore.isNetConnected,
    getCityLightList: stores.citiesListStore.getCityLightList,
    cityLightList: stores.citiesListStore.cityLightList,
  }));

  const onReady = async () => {
    onRouterStoreReady(navigationRef);

    const { total } = await getCityLightList();

    if (!total && !getIsNetConnected()) {
      navigationRef.current.navigate(SCREENS.Offline as never);

      return;
    }
  };

  useEffect(() => {
    if (!isNetConnected && cityLightList.length) {
      navigationRef.current?.navigate(SCREENS.CitiesList as never);
    } else if (!isNetConnected && !cityLightList.length) {
      navigationRef.current?.navigate(SCREENS.Offline as never);
    }
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
              name={route.name as any}
              component={route.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default observer(Navigator);
