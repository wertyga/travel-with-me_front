import React from 'react';

import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { CText } from '@/components/CText';
import { ScrollHorizontalNoEdges } from '@/components/ScrollHorizontalNoEdges/ScrollHorizontalNoEdges';
import { Avatar as UIAvatar } from '@/components/UI/Avatar';

import { User } from '@/types/user';

type Props = {
  users: User[];
  size?: number;
};

export const UsersPreviewList = ({ users, size = 70 }: Props) => {
  return (
    <ScrollHorizontalNoEdges>
      {users.map(user => (
        <Pressable key={user._id}>
          <UIAvatar size={size} avatar={user.avatar} username={user.username} />
          <CText>{user.username}</CText>
        </Pressable>
      ))}
    </ScrollHorizontalNoEdges>
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    borderRadius: 30,
  },
});
