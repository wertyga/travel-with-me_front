import React, { useEffect } from 'react';

import { Linking, StyleSheet, Switch, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { Version } from '@/components/Common';
import { Loader } from '@/components/Loader';
import { handleUpdateApp } from '@/components/UpdateApp/UpdateApp.utils';
import { Avatar } from '@/components/User/Avatar/Avatar';
import ChangeVisibilityButton from '@/components/User/ChangeVisibilityButton/ChangeVisibilityButton';
import UsersNearMeButton from '@/components/User/UsersNearMeButton/UsersNearMeButton';
import {
  useAuthGuard,
  useFocus,
  useForegroundPermissions,
  useNavigation,
  useStores,
} from '@/hooks';

import { getIsNetConnected } from '@/utils/etc';

import { SCREENS } from '@/types';

const ProfileScreen = () => {
  useAuthGuard();

  const navi = useNavigation();

  const {
    user,
    logout,
    isUpdateAvailable,
    cachedCitiesIds,
    hasUserChanged,
    fetchUpdateUser,
    resetUpdatedUser,
    isLoading,
    onStartWatchingLocation,
    getMyChats,
    myChatsCount,
    // achievementsCount,
  } = useStores(stores => ({
    user: stores.userStore.user,
    hasUserChanged: stores.userStore.hasUserChanged,
    fetchUpdateUser: stores.userStore.fetchUpdateUser,
    resetUpdatedUser: stores.userStore.resetUpdatedUser,
    lastCoords: stores.userStore.lastCoords,
    isLoading: stores.userStore.isLoading,
    logout: stores.authStore.logout,
    isUpdateAvailable: stores.appStateStore.isUpdateAvailable,
    cachedCitiesIds: stores.offlineStore.cachedCitiesIds,
    onStartWatchingLocation: stores.locationStore.onStartWatchingLocation,
    getMyChats: stores.chatsStore.getMyChats,
    myChatsCount: stores.chatsStore.myChatsCount,
    // achievementsCount: stores.achievementsStore.achievementsCount,
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
    getMyChats();
  }, []);

  useEffect(() => {
    if (!granted) return;

    // The case when change permission settings
    onStartWatchingLocation();
  }, [granted]);

  if (!user) return null;

  const isNetConnected = getIsNetConnected();
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

        {isNetConnected && (
          <>
            <ChangeVisibilityButton />
            <UsersNearMeButton />
          </>
        )}

        {!!myChatsCount && (
          <Button href={SCREENS.ChatList} high style={{ marginBottom: 20 }}>
            {`Chats (${myChatsCount})`}
          </Button>
        )}

        {/*<Button style={styles.item} href={SCREENS.Achievements} noPaddings>*/}
        {/*  <CText>Achievements</CText>*/}
        {/*  <CText style={styles.edit}>{user.rank}</CText>*/}
        {/*</Button>*/}

        {isNetConnected && (
          <Button
            style={styles.item}
            href={isNetConnected && SCREENS.Contact}
            noPaddings
          >
            <CText>Support</CText>
            <CText style={styles.edit}>{getHelpLabel}</CText>
          </Button>
        )}

        {isShowOfflineStorage && (
          <Button style={styles.item} href={SCREENS.OfflineStorage} noPaddings>
            <CText>Offline Storage</CText>
            <CText style={styles.edit}>{editLabel}</CText>
          </Button>
        )}

        {hasUserChanged && (
          <Button
            onPress={fetchUpdateUser}
            high
            style={styles.separateBtn}
            solid
          >
            Update Profile
          </Button>
        )}

        {isNetConnected && (
          <Button onPress={handleLogout} high style={styles.separateBtn}>
            Logout
          </Button>
        )}

        {isShowUpdateBtn && (
          <Button onPress={handleUpdateApp} high style={styles.separateBtn}>
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
  avatarAndName: {
    alignItems: 'center',
  },
  item: {
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  edit: {
    fontSize: 10,
    paddingTop: 5,
    paddingRight: 10,
  },
  separateBtn: {
    marginTop: 25,
  },
  name: {
    marginLeft: 15,
  },
  helpBtn: {},
});

export default observer(ProfileScreen);
