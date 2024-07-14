import React from 'react';

import { Dimensions, Linking, StyleSheet, Switch, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { Version } from '@/components/Common';
import { handleUpdateApp } from '@/components/UpdateApp/UpdateApp.utils';
import {
  useAuthGuard,
  useForegroundPermissions,
  useNavigation,
  useSubscription,
} from '@/hooks';
import { useStores } from '@/hooks';

import { SCREENS } from '@/types';

const ProfileScreen = () => {
  useAuthGuard();

  const navi = useNavigation();

  const { user, logout, isUpdateAvailable } = useStores(stores => ({
    user: stores.userStore.user,
    logout: stores.authStore.logout,
    isUpdateAvailable: stores.appStateStore.isUpdateAvailable,
  }));

  const { granted } = useForegroundPermissions();

  const { subscription } = useSubscription();

  const handleLogout = () => {
    navi.navigate(SCREENS.CitiesList);
    logout();
  };

  const changePermissions = async () => {
    await Linking.openSettings();
  };

  if (!user) return null;

  return (
    <MainLayout headerTitle="Profile" style={styles.container}>
      <CText style={styles.item}>{user.username}</CText>

      <Button style={styles.item} href={SCREENS.ChangeEmail} noPaddings>
        <CText>{user.email}</CText>
        <CText style={styles.edit}>Edit</CText>
      </Button>

      <Button style={styles.item} noPaddings onPress={changePermissions}>
        <CText>Foreground position permission</CText>
        <Switch value={granted} onChange={changePermissions} />
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

      {isUpdateAvailable && (
        <Button onPress={handleUpdateApp} high style={styles.logoutBtn}>
          Update app
        </Button>
      )}

      <Version />
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
