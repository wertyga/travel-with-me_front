import { StyleSheet, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { BackgroundGradient } from '@/components/BackgroundGradient';
import { CText } from '@/components/CText';
import { UsersPreviewList } from '@/components/User/UsersPreviewList/UsersPreviewList';
import { useStores } from '@/hooks';

import { CONSTANTS } from '@/styles/constants';

type Props = {};

export const UsersNearMe = () => {
  const { usersNearMe, user } = useStores(stores => ({
    usersNearMe: stores.userStore.usersNearMe,
    user: stores.userStore.user,
  }));

  return (
    <BackgroundGradient style={styles.container}>
      <View>
        <CText>People in your city</CText>
        <UsersPreviewList users={usersNearMe} />
      </View>
    </BackgroundGradient>
  );
};

export default observer(UsersNearMe);

const styles = StyleSheet.create({
  container: {
    paddingBottom: CONSTANTS.spaces.footerHeight + 20,
    paddingTop: 20,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
});
