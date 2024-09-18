import React, { useEffect } from 'react';

import {
  CrimsonText_400Regular as Crimson,
  CrimsonText_700Bold as CrimsonBold,
  CrimsonText_600SemiBold as CrimsonSemiBold,
  useFonts,
} from '@expo-google-fonts/crimson-text';
import {
  OpenSans_400Regular as OpenSans,
  OpenSans_700Bold as OpenSansBold,
  OpenSans_600SemiBold as OpenSansSemiBold,
} from '@expo-google-fonts/open-sans';

import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { StoreProvider } from '@/mobx/StoreProvider';
import * as stores from '@/mobx/stores';

import { PermissionRequestPopup } from '@/components/Location/PermissionRequestPopup';
import { Toast } from '@/components/Toast';
import UpdateApp from '@/components/UpdateApp/UpdateApp';
import ModalProvider from '@/context/ModalContext/ModalContext';

import { initiateConsoleTime } from '@/utils';

import Navigator from './app/Navigator';

SplashScreen.preventAutoHideAsync();

initiateConsoleTime();

function App() {
  const [fontsLoaded, fontError] = useFonts({
    Crimson,
    CrimsonSemiBold,
    CrimsonBold,
    OpenSans,
    OpenSansSemiBold,
    OpenSansBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <StoreProvider store={stores}>
      <StatusBar style="light" />
      <Navigator />
      <PermissionRequestPopup />
      <Toast />
      <UpdateApp />
    </StoreProvider>
  );
}

export default App;
