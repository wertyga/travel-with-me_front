import React, { useEffect } from 'react';

import { Linking, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { Version } from '@/components/Common';
import { Loader } from '@/components/Loader';
import { handleUpdateApp } from '@/components/UpdateApp/UpdateApp.utils';
import { Avatar } from '@/components/User/Avatar/Avatar';
import ChangeVisibilityButton from '@/components/User/ChangeVisibilityButton/ChangeVisibilityButton';
import { LanguagesSelect } from '@/components/User/LanguagesSelect/LanguagesSelect';
import {
  useAuthGuard,
  useFocus,
  useForegroundPermissions,
  useNavigation,
  useStores,
} from '@/hooks';

import { SCREENS } from '@/types';

const ProfileScreen = () => {
  useAuthGuard();

  const navi = useNavigation();

  const {
    user,
    logout,
    isUpdateAvailable,
    // cachedCitiesIds,
    isLoading,
    onStartWatchingLocation,
    getMyChats,
    myChatsCount,
    isNetConnected,
  } = useStores(stores => ({
    user: stores.userStore.user,
    isLoading: stores.userStore.isLoading,
    logout: stores.authStore.logout,
    isUpdateAvailable: stores.appStateStore.isUpdateAvailable,
    // cachedCitiesIds: stores.offlineStore.cachedCitiesIds,
    onStartWatchingLocation: stores.locationStore.onStartWatchingLocation,
    getMyChats: stores.chatsStore.getMyChats,
    myChatsCount: stores.chatsStore.myChatsCount,
    isNetConnected: stores.appStateStore.isNetConnected,
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
    getMyChats();
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
  // const isShowOfflineStorage = !!cachedCitiesIds.length;

  return (
    <>
      <MainLayout headerTitle="Profile" withBackButton>
        {isLoading && <Loader />}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.avatarAndName]}>
            <Avatar editable />
            <CText style={styles.name} light>
              {user.username}
            </CText>
          </View>

          <Button
            style={styles.item}
            href={isNetConnected && SCREENS.ChangeEmail}
            noPaddings
          >
            <CText light>{user.email}</CText>
            <CText style={styles.edit} light>
              {editLabel}
            </CText>
          </Button>

          <Button style={styles.item} noPaddings onPress={changePermissions}>
            <CText light>Foreground position permission</CText>
            <Switch value={granted} onChange={changePermissions} />
          </Button>

          {isNetConnected && (
            <>
              <View style={styles.item}>
                <ChangeVisibilityButton />
              </View>
            </>
          )}

          <View style={{ marginTop: 10 }}>
            <LanguagesSelect />
          </View>

          {!!myChatsCount && (
            <Button
              href={SCREENS.ChatList}
              high
              style={{ marginTop: 10 }}
              light
            >
              Chats
            </Button>
          )}

          {isNetConnected && (
            <Button
              style={[styles.item, { marginTop: 15 }]}
              href={isNetConnected && SCREENS.Contact}
              noPaddings
            >
              <CText light>Support</CText>
              <CText style={styles.edit} light>
                {getHelpLabel}
              </CText>
            </Button>
          )}

          {/*{isShowOfflineStorage && (*/}
          {/*  <Button*/}
          {/*    style={[styles.item, {}]}*/}
          {/*    href={SCREENS.OfflineStorage}*/}
          {/*    noPaddings*/}
          {/*  >*/}
          {/*    <CText light>Offline Storage</CText>*/}
          {/*    <CText style={styles.edit} light>*/}
          {/*      {editLabel}*/}
          {/*    </CText>*/}
          {/*  </Button>*/}
          {/*)}*/}

          {isNetConnected && (
            <Button
              onPress={handleLogout}
              high
              style={styles.separateBtn}
              light
            >
              Logout
            </Button>
          )}

          {isShowUpdateBtn && (
            <Button
              onPress={handleUpdateApp}
              high
              style={styles.separateBtn}
              light
            >
              Update app
            </Button>
          )}

          <Version />
        </ScrollView>
      </MainLayout>
    </>
  );
};

const styles = StyleSheet.create({
  avatarAndName: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    marginTop: 20,
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
