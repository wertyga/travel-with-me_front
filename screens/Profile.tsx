import React, { useCallback, useState } from 'react';
import {
  AppState,
  Dimensions,
  Linking,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import {
  useAuthGuard,
  useFocus,
  useNavigation,
  useSubscription,
} from '@/hooks';
import { useStores } from '@/hooks';
import { observer } from 'mobx-react';
import { SCREENS } from '@/types';

const ProfileScreen = () => {
  useAuthGuard();

  const navi = useNavigation();
  const { user, logout, getSelf } = useStores(stores => ({
    user: stores.userStore.user,
    getSelf: stores.userStore.getSelf,
    logout: stores.authStore.logout,
  }));

  const { subscription } = useSubscription();

  const [state, setState] = useState({
    foreground: {
      isDenied: false,
      isGranted: false,
    },
  });

  const handleLogout = () => {
    navi.navigate(SCREENS.CitiesList);
    logout();
  };

  const stateListener = useCallback((state: string) => {
    if (state == 'active') {
      getPermissions();
    }
  }, []);

  const getPermissions = async () => {
    const [{ status: foregroundStatus }] = await Promise.all([
      Location.getForegroundPermissionsAsync(),
    ]);

    setState(prev => ({
      ...prev,
      foreground: {
        isDenied: foregroundStatus === 'denied',
        isGranted: foregroundStatus === 'granted',
      },
    }));
  };

  const onChangePermission = (aim: 'background' | 'foreground') => async () => {
    const { isGranted, isDenied } = state[aim];

    if (isGranted || isDenied) {
      await Linking.openSettings();
      await getPermissions();

      return;
    }

    if (aim === 'foreground') {
      Location.requestForegroundPermissionsAsync();
    }
  };

  useFocus(() => {
    getPermissions();
    const subscription = AppState.addEventListener('change', stateListener);

    return () => {
      subscription.remove();
    };
  });

  if (!user) return null;

  return (
    <MainLayout headerTitle="Profile" style={styles.container}>
      <CText style={styles.item}>{user.username}</CText>

      <Button style={styles.item} href={SCREENS.ChangeEmail} noPaddings>
        <CText>{user.email}</CText>
        <CText style={styles.edit}>Edit</CText>
      </Button>

      <Button
        style={styles.item}
        noPaddings
        onPress={onChangePermission('foreground')}
      >
        <CText>Foreground position permission</CText>
        <Switch value={state.foreground.isGranted} />
      </Button>

      {!!subscription && (
        <Button style={styles.item} href={SCREENS.Subscriptions} noPaddings>
          <CText>Subscription</CText>
          <CText style={styles.edit}>
            {new Date(subscription.validUntil).toLocaleDateString()}
          </CText>
          <CText style={styles.edit}>Edit</CText>
        </Button>
      )}

      <Button style={styles.item} href={SCREENS.Contact} noPaddings>
        <CText>Support</CText>
        <CText style={styles.edit}>Get Help</CText>
      </Button>

      {!subscription && (
        <Button high href={SCREENS.Subscriptions}>
          Buy subscription
        </Button>
      )}

      <Button onPress={handleLogout} high style={styles.logoutBtn}>
        Logout
      </Button>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  item: {
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  edit: {
    fontSize: 10,
    padding: 10,
  },
  logoutBtn: {
    marginTop: 25,
  },
  optionSubtext: {
    marginTop: 10,
  },
  optionText: {
    maxWidth: Dimensions.get('window').width * 0.7,
  },
});

export default observer(ProfileScreen);
