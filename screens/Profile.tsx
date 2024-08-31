import React, { useEffect } from 'react';

import { Dimensions, Linking, StyleSheet, Switch, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { Version } from '@/components/Common';
import { Loader } from '@/components/Loader';
import { UploadChoice } from '@/components/UI/UploadChoice';
import { handleUpdateApp } from '@/components/UpdateApp/UpdateApp.utils';
import { Avatar } from '@/components/User/Avatar/Avatar';
import {
  useAuthGuard,
  useFocus,
  useForegroundPermissions,
  useNavigation,
} from '@/hooks';
import { useStores } from '@/hooks';

import { SCREENS } from '@/types';

const ProfileScreen = () => {
  useAuthGuard();

  const navi = useNavigation();

  const {
    user,
    logout,
    isUpdateAvailable,
    isNetConnected,
    cachedCitiesIds,
    hasUserChanged,
    fetchUpdateUser,
    resetUpdatedUser,
    isLoading,
    onStartWatchingLocation,
    achievementsCount,
  } = useStores(stores => ({
    user: stores.userStore.user,
    hasUserChanged: stores.userStore.hasUserChanged,
    fetchUpdateUser: stores.userStore.fetchUpdateUser,
    resetUpdatedUser: stores.userStore.resetUpdatedUser,
    isLoading: stores.userStore.isLoading,
    logout: stores.authStore.logout,
    isUpdateAvailable: stores.appStateStore.isUpdateAvailable,
    isNetConnected: stores.appStateStore.isNetConnected,
    cachedCitiesIds: stores.offlineStore.cachedCitiesIds,
    onStartWatchingLocation: stores.locationStore.onStartWatchingLocation,
    achievementsCount: stores.achievementsStore.achievementsCount,
  }));

  const { granted } = useForegroundPermissions();

  const handleLogout = () => {
    if (!isNetConnected) return;

    navi.navigate(SCREENS.CitiesList);
    logout();
  };

  const changePermissions = async () => {
    await Linking.openSettings();
  };

  useFocus(() => {
    resetUpdatedUser();
  }, []);

  useEffect(() => {
    if (!granted) return;

    // The case when change permission settings
    onStartWatchingLocation();
  }, [granted]);

  if (!user) return null;

  const editLabel = isNetConnected ? 'Edit' : 'Offline';
  const getHelpLabel = isNetConnected ? 'Get Help' : 'Offline';
  const isShowUpdateBtn = isNetConnected && isUpdateAvailable;
  const isShowOfflineStorage = !!cachedCitiesIds.length;

  return (
    <>
      <MainLayout headerTitle="Profile" style={styles.container}>
        {isLoading && <Loader />}

        <View style={[styles.item, styles.avatarAndName]}>
          <Avatar editable />
          <CText style={styles.name}>{user.username}</CText>
        </View>

        <Button
          style={styles.item}
          href={isNetConnected && SCREENS.ChangeEmail}
          noPaddings
        >
          <CText>{user.email}</CText>
          <CText style={styles.edit}>{editLabel}</CText>
        </Button>

        <Button style={styles.item} noPaddings onPress={changePermissions}>
          <CText>Foreground position permission</CText>
          <Switch value={granted} onChange={changePermissions} />
        </Button>

        {/*<Button style={styles.item} href={SCREENS.Achievements} noPaddings>*/}
        {/*  <CText>Achievements</CText>*/}
        {/*  <CText style={styles.edit}>{user.rank}</CText>*/}
        {/*</Button>*/}

        <Button
          style={styles.item}
          href={isNetConnected && SCREENS.Contact}
          noPaddings
        >
          <CText>Support</CText>
          <CText style={styles.edit}>{getHelpLabel}</CText>
        </Button>

        {isShowOfflineStorage && (
          <Button style={styles.item} href={SCREENS.OfflineStorage} noPaddings>
            <CText>Offline Storage</CText>
            <CText style={styles.edit}>{editLabel}</CText>
          </Button>
        )}

        {hasUserChanged && (
          <Button onPress={fetchUpdateUser} high style={styles.logoutBtn} solid>
            Update Profile
          </Button>
        )}

        {isNetConnected && (
          <Button onPress={handleLogout} high style={styles.logoutBtn}>
            Logout
          </Button>
        )}

        {isShowUpdateBtn && (
          <Button onPress={handleUpdateApp} high style={styles.logoutBtn}>
            Update app
          </Button>
        )}

        <Version />
      </MainLayout>
    </>
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
  avatarAndName: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  name: {
    marginLeft: 15,
  },
});

export default observer(ProfileScreen);
