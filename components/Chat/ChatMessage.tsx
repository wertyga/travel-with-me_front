import { useMemo } from 'react';

import { StyleSheet, View } from 'react-native';

import { CText } from '@/components/CText';
import { Avatar } from '@/components/UI/Avatar';

import { getBeautifyDateTime } from '@/utils';

type Props = {
  isOwner?: boolean;
  avatar: string;
  username: string;
  message: string;
  timestamp?: string;
};

export const ChatMessage = ({
  isOwner,
  username,
  avatar,
  message,
  timestamp,
}: Props) => {
  const { date, time } = useMemo(() => {
    if (!timestamp) {
      return {
        date: '',
        time: '',
      };
    }

    return getBeautifyDateTime(timestamp);
  }, [timestamp]);

  return (
    <View style={[styles.container, isOwner && styles.ownerContainer]}>
      {!isOwner && (
        <Avatar
          avatar={avatar}
          size={30}
          username={username}
          style={styles.avatar}
        />
      )}

      <View style={[styles.message, isOwner && styles.messageOwner]}>
        {!!timestamp && (
          <View style={styles.dateTime}>
            <CText style={styles.date}>{date}</CText>
            <CText style={styles.date}>{time}</CText>
          </View>
        )}
        <CText>{message}</CText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  ownerContainer: {
    justifyContent: 'flex-end',
  },
  date: {
    fontSize: 10,
  },
  avatar: {
    borderWidth: 1,
  },
  message: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'white',
  },
  messageOwner: {},
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
  },
});
