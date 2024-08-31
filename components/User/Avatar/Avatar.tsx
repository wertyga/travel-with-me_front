import React from 'react';

import {
  Image,
  ImageBackground,
  ImageStyle,
  StyleSheet,
  View,
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';

import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import { ImageStorage, UploadImage } from '@/components/UI';
import { UploadChoice } from '@/components/UI/UploadChoice';
import { useStores } from '@/hooks';

type Props = {
  size?: number;
  editable?: boolean;
};

export const Avatar = ({ size = 70, editable }: Props) => {
  const { firstUsernameLetter, avatar, updateUser, user } = useStores(
    stores => ({
      firstUsernameLetter: stores.userStore.user?.username
        .charAt(0)
        .toUpperCase(),
      user: stores.userStore.user,
      avatar: stores.userStore.user?.avatar,
      updateUser: stores.userStore.updateUser,
    })
  );

  const onUpdate = ({ uri }: ImageStorage) => {
    updateUser({ avatar: uri });
  };

  if (!editable) {
    return (
      <View
        style={{
          ...styles.container,
          ...{
            width: size,
            height: size,
          },
        }}
      >
        {!!avatar && (
          <Image source={{ uri: avatar }} style={styles.imageStyle} />
        )}

        {!avatar && <CText style={styles.text}>{firstUsernameLetter}</CText>}
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        ...{
          width: size,
          height: size,
        },
      }}
    >
      <UploadImage
        uri={avatar}
        onUpdate={onUpdate}
        imageStyle={styles.imageStyle}
        additionalContent={
          <Feather
            name="edit-3"
            size={16}
            color="white"
            style={{
              ...styles.edit,
              left: size / 2 - 8,
            }}
          />
        }
      >
        <CText style={styles.text}>{firstUsernameLetter}</CText>
      </UploadImage>
    </View>
  );
};

export default observer(Avatar);

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    padding: 3,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 30,
  },
  edit: {
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
  },
});
