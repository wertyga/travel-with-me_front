import React, { useRef, useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { Avatar as UIAvatar } from '@/components/UI/Avatar';
import { useAuthGuard, useFocus, useNavigation, useStores } from '@/hooks';

import { SCREENS } from '@/types';
import { User } from '@/types/user';

const UsersNearMeScreen = () => {
  useAuthGuard();

  const navi = useNavigation();

  const { getUsersNearMe, usersNearMe, getMyCity } = useStores(stores => ({
    usersNearMe: stores.userStore.usersNearMe,
    getUsersNearMe: stores.userStore.getUsersNearMe,
    getMyCity: stores.userStore.getMyCity,
  }));

  const [state, setState] = useState({
    myCity: null,
    isLoading: false,
    isShowLoading: true,
  });

  const fetchUsersNearMe = async (isShowLoading?: boolean) => {
    setState(prev => ({ ...prev, isLoading: true, isShowLoading }));
    await getUsersNearMe();

    setState(prev => ({ ...prev, myCity: getMyCity(), isLoading: false }));
  };

  const onPressGoToChat = async (user: User) => {
    navi.navigate(SCREENS.Chat, { withUser: user });
  };

  useFocus(() => {
    fetchUsersNearMe();
  }, []);

  const isLoading =
    state.isLoading && (!usersNearMe.length || state.isShowLoading);

  return (
    <MainLayout
      headerTitle={`Users Near Me • ${state.myCity?.title}`}
      bgImage={state.myCity?.image}
      isLoading={isLoading}
    >
      <View style={styles.reload}>
        <Button
          squareSize={40}
          rectangle
          onPress={() => fetchUsersNearMe(true)}
        >
          <Ionicons name="reload" size={24} color="white" />
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {usersNearMe.map(user => {
          return (
            <Button
              key={user._id}
              style={styles.user}
              onPress={() => onPressGoToChat(user)}
            >
              <UIAvatar
                size={50}
                avatar={user.avatar}
                username={user.username}
                style={styles.avatar}
              />

              <View>
                <View style={styles.onlineWrapper}>
                  <CText>{user.username}</CText>
                  {/*<View style={styles.online} />*/}
                </View>
                <CText style={styles.lastCity}>{user.lastCity?.title}</CText>
              </View>
            </Button>
          );
        })}
      </ScrollView>
    </MainLayout>
  );
};

export default observer(UsersNearMeScreen);

const styles = StyleSheet.create({
  list: {
    gap: 20,
  },
  user: {
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  avatar: {
    marginRight: 10,
  },
  onlineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  lastCity: {
    fontSize: 12,
  },
  online: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  reload: {
    paddingBottom: 20,
    alignItems: 'flex-end',
  },
});
