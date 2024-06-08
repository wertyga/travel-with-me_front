import React, { useCallback, useEffect, useState } from 'react';
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
import { useAuth } from '@/context';
import { useAuthGuard, useNavigation, useSubscription } from '@/hooks';
import { SCREENS } from '@/types';

const ProfileScreen = () => {
  useAuthGuard();

  const navi = useNavigation();
  const { logout, user } = useAuth();
  const { subscription } = useSubscription();

  const [state, setState] = useState({
    foreground: {
      isDenied: false,
      isGranted: false,
    },
    background: {
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
    const [{ status: foregroundStatus }, { status: backgroundStatus }] =
      await Promise.all([
        Location.getForegroundPermissionsAsync(),
        Location.getBackgroundPermissionsAsync(),
      ]);

    setState(prev => ({
      ...prev,
      foreground: {
        isDenied: foregroundStatus === 'denied',
        isGranted: foregroundStatus === 'granted',
      },
      background: {
        isDenied: backgroundStatus === 'denied',
        isGranted: backgroundStatus === 'granted',
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
    } else {
      Location.requestBackgroundPermissionsAsync();
    }
  };

  useEffect(() => {
    getPermissions();
    const subscription = AppState.addEventListener('change', stateListener);

    return () => {
      subscription.remove();
    };
  }, []);

  if (!user) return null;

  return (
    <MainLayout headerTitle="Profile" style={styles.container}>
      <CText style={styles.item}>{user.username}</CText>
      <View style={styles.item}>
        <CText>{user.email}</CText>
        <CText
          style={styles.edit}
          onPress={() => {
            navi.navigate(SCREENS.ChangeEmail);
          }}
        >
          Edit
        </CText>
      </View>

      <View style={styles.item}>
        <CText>Foreground position permission</CText>
        <Switch
          value={state.foreground.isGranted}
          onValueChange={onChangePermission('foreground')}
        />
      </View>

      {/*<View style={styles.item}>*/}
      {/*  <View style={styles.optionText}>*/}
      {/*    <CText>Background position permission</CText>*/}
      {/*    <CText small style={styles.optionSubtext}>*/}
      {/*      This app collects location data to keep enabled your live location*/}
      {/*      even when the app is closed or not in use.*/}
      {/*    </CText>*/}
      {/*  </View>*/}
      {/*  <Switch*/}
      {/*    value={state.background.isGranted}*/}
      {/*    onValueChange={onChangePermission('background')}*/}
      {/*  />*/}
      {/*</View>*/}

      {!!subscription && (
        <View style={styles.item}>
          <CText>Subscription</CText>
          <CText style={styles.edit}>
            {new Date(subscription.validUntil).toLocaleDateString()}
          </CText>
          <CText
            style={styles.edit}
            onPress={() => {
              navi.navigate(SCREENS.Subscriptions);
            }}
          >
            Edit
          </CText>
        </View>
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

export default ProfileScreen;
