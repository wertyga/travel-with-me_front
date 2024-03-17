import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  CrimsonText_400Regular as Crimson,
  CrimsonText_600SemiBold as CrimsonSemiBold,
  CrimsonText_700Bold as CrimsonBold,
} from '@expo-google-fonts/crimson-text';
import {
  OpenSans_400Regular as OpenSans,
  OpenSans_600SemiBold as OpenSansSemiBold,
  OpenSans_700Bold as OpenSansBold,
} from '@expo-google-fonts/open-sans';
import { Provider } from 'react-redux';
import { Toast } from '@/components/Toast';
import { store } from '@/app/store/create-isomorphic-store';
import { AuthProvider, LayoutProvider, AppStateProvider } from './context';
import Navigator from './app/Navigator';

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

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <AuthProvider>
        <AppStateProvider>
          <LayoutProvider>
            <Navigator />
          </LayoutProvider>
        </AppStateProvider>
      </AuthProvider>
      <Toast />
    </Provider>
  );
}

export default App;
