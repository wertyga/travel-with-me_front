import React from 'react';

import { StyleSheet } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import Chat from '@/components/Chat/Chat';
import { useAuthGuard, useStores } from '@/hooks';

import { User } from '@/types/user';

const ChatScreen = () => {
  useAuthGuard();

  const router = useRoute();

  const { withUser } = (router.params || {}) as {
    withUser: User;
  };

  const { user } = useStores(stores => ({
    user: stores.userStore.user,
  }));

  if (!withUser) return null;

  return (
    <MainLayout style={styles.layout}>
      <Chat mainUser={user} guestUser={withUser} />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: 50,
  },
});

export default observer(ChatScreen);
