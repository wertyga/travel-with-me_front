import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
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
import { baseQuery } from '@/app/query';
import { store } from '@/app/store/create-isomorphic-store';
import { Toast } from '@/components/Toast';
import { fetchEnvs, updateAppStateListener } from '@/stores';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { NativeWindStyleSheet } from 'nativewind';
import Navigator from './app/Navigator';
import { AuthProvider, LayoutProvider } from './context';

SplashScreen.preventAutoHideAsync();

NativeWindStyleSheet.setOutput({
  default: 'native',
});

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

  useEffect(() => {
    AppState.addEventListener('change', updateAppStateListener);
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <AuthProvider>
        <LayoutProvider>
          <Navigator />
        </LayoutProvider>
      </AuthProvider>
      <Toast />
    </Provider>
  );
}

export default App;
