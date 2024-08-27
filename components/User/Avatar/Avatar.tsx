import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

import { observer } from 'mobx-react-lite';

import { CText } from '@/components/CText';
import { ImageStorage, UploadImage } from '@/components/UI';
import { useStores } from '@/hooks';

export const Avatar = () => {
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

  return (
    <View>
      <UploadImage
        uri={avatar}
        onUpdate={onUpdate}
        style={styles.container}
        imageStyle={styles.imageStyle}
      >
        <CText style={styles.text}>{firstUsernameLetter}</CText>
      </UploadImage>
      <Feather name="edit-3" size={16} color="white" style={styles.edit} />
    </View>
  );
};

export default observer(Avatar);

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    padding: 3,
    width: 70,
    height: 70,
    position: 'relative',
  },
  imageStyle: {
    borderRadius: 100,
  },
  text: {
    fontSize: 30,
  },
  edit: {
    zIndex: 2,
    position: 'absolute',
    bottom: -5,
    left: 28,
  },
});
