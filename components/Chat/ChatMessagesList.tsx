import React, { useEffect, useRef } from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import { CText } from '@/components/CText';
import { ChatMessage } from '@/components/Chat/ChatMessage';

import { Chat } from '@/types';
import { User } from '@/types/user';

import { CONSTANTS } from '@/styles/constants';

type Props = {
  mainUser: User;
  chat: Chat | null;
};

export const ChatMessagesList = ({ chat, mainUser }: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const { messages = [] } = chat || {};

  useEffect(() => {
    if (!scrollViewRef.current) return;

    setTimeout(() => scrollViewRef.current.scrollToEnd({ animated: true }));
  }, [messages.length]);

  return (
    <ScrollView
      contentContainerStyle={styles.messages}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
    >
      {!messages.length && (
        <CText style={styles.noMessages}>No messages yet</CText>
      )}

      {messages.map(message => {
        const isOwnerMessage = message.from === mainUser._id;
        const user = chat.from._id === message.from ? chat.from : chat.to;

        return (
          <ChatMessage
            key={message._id}
            isOwner={isOwnerMessage}
            timestamp={message.createdAt}
            avatar={user.avatar}
            username={user.username}
            message={message.text}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  messages: {
    gap: 10,
  },
  noMessages: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
