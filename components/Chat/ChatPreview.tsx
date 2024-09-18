import { StyleSheet, View } from 'react-native';

import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { Avatar } from '@/components/UI/Avatar';

import { getBeautifyDateTime } from '@/utils';

import { ChatMessage, SCREENS } from '@/types';
import { User } from '@/types/user';

type Props = {
  user: User;
  lastMessage: ChatMessage;
  hasChatUnreadMessage: boolean;
};

export const ChatPreview = ({
  user,
  hasChatUnreadMessage,
  lastMessage,
}: Props) => {
  const { date, time } = getBeautifyDateTime(lastMessage.createdAt);

  return (
    <Button
      style={styles.container}
      transparent
      href={SCREENS.Chat}
      hrefParams={{ withUser: user }}
    >
      <View style={styles.user}>
        <Avatar avatar={user.avatar} username={user.username} size={50} />

        <View>
          <CText light>{user.username}</CText>
          <CText style={styles.text} numberOfLines={1} light>
            {lastMessage.text}
          </CText>
        </View>
      </View>

      <View style={styles.sideContent}>
        <CText style={styles.date} light>{`${date} ${time}`}</CText>
        {hasChatUnreadMessage && <View style={styles.hasNew} />}
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  hasNew: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'green',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  user: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    marginRight: 10,
  },
  sideContent: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 12,
    marginTop: 8,
  },
  date: {
    fontSize: 12,
  },
});
