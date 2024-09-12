import React from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import { observer } from 'mobx-react-lite';

import { MainLayout } from '@/Layouts';
import { ChatPreview } from '@/components/Chat/ChatPreview';
import { useAuthGuard, useFocus, useStores } from '@/hooks';

const ChatListScreen = () => {
  useAuthGuard();

  const { user, getMyChats, myChats } = useStores(stores => ({
    user: stores.userStore.user,
    getMyChats: stores.chatsStore.getMyChats,
    myChats: stores.chatsStore.myChats,
  }));

  useFocus(() => {
    getMyChats();
  }, []);

  return (
    <MainLayout headerTitle="My chats">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {myChats.map(chat => {
          const userFrom = [chat.to, chat.from].find(
            chatUser => chatUser._id !== user._id
          );
          if (!userFrom) return null;

          return (
            <ChatPreview
              key={chat._id}
              user={userFrom}
              lastMessage={chat.lastMessage}
              hasChatUnreadMessage={chat.hasChatUnreadMessage}
            />
          );
        })}
      </ScrollView>
    </MainLayout>
  );
};

export default observer(ChatListScreen);

const styles = StyleSheet.create({
  listContent: {
    gap: 20,
  },
});
