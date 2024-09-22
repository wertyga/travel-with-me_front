import React, { useRef, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { BackButton } from '@/Layouts/MainLayout/components/BackButton';
import Button from '@/components/Button';
import { ChatMessagesList } from '@/components/Chat/ChatMessagesList';
import { Input } from '@/components/Input';
import { AvatarWithName } from '@/components/UI/AvatarWithName';
import { useFocus, useStores } from '@/hooks';

import { Chat as ChatType } from '@/types';
import { User } from '@/types/user';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  mainUser: User;
  guestUser: User;
  chatId?: string;
};

const FETCH_INTERVAL = 3000;

const Chat = ({ mainUser, guestUser }: Props) => {
  const interval = useRef(null);

  const { getChatWithUser, sendMessage } = useStores(stores => ({
    getChatWithUser: stores.chatsStore.getChatWithUser,
    sendMessage: stores.chatsStore.sendMessage,
  }));

  const [chat, setChat] = useState<ChatType | null>(null);
  const [state, setState] = useState({
    textValue: '',
    isLoading: false,
  });

  const toggleLoading = () => {
    setState(prev => ({ ...prev, isLoading: !prev.isLoading }));
  };

  const onChangeMessage = textValue => {
    setState(prev => ({ ...prev, textValue }));
  };

  const updateChat = async () => {
    const chat = await getChatWithUser(guestUser._id, true);

    setChat(chat);
  };

  const onSubmit = async () => {
    if (!state.textValue) return;

    toggleLoading();

    await sendMessage({ text: state.textValue, to: guestUser._id });
    setState(prev => ({ ...prev, textValue: '' }));

    await updateChat();

    toggleLoading();
  };

  const getChatInitially = async () => {
    toggleLoading();
    await updateChat();

    interval.current = setInterval(updateChat, FETCH_INTERVAL);

    toggleLoading();
  };

  useFocus(() => {
    getChatInitially();

    return () => {
      clearInterval(interval.current);
      interval.current = null;
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <BackButton transparent />
          <AvatarWithName
            size={40}
            avatar={guestUser.avatar}
            username={guestUser.username}
            underNameText={guestUser.languages
              ?.map(({ flag }) => flag)
              .join(' ')}
          />
        </View>

        <ChatMessagesList chat={chat} mainUser={mainUser} />
      </View>

      <View>
        <Input
          inputStyle={styles.textarea}
          multiline
          value={state.textValue}
          onChange={onChangeMessage}
          editable={!state.isLoading}
          placeholder="Message"
          autoCapitalize="none"
        />

        <Button
          disabled={!state.textValue || state.isLoading}
          style={styles.submitBtn}
          onPress={onSubmit}
          high
          rectangle
          filled
        >
          Send
        </Button>
      </View>
    </View>
  );
};

export default observer(Chat);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CONSTANTS.colors.bgLight,
    paddingVertical: 10,
    marginHorizontal: -CONSTANTS.spaces.paddingHorizontal,
  },
  content: {
    flex: 1,
  },
  textarea: {
    height: 150,
    textAlignVertical: 'top',
    padding: 5,
  },
  submitBtn: {
    marginTop: 10,
  },
});
