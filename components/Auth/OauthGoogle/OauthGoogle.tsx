import { useState } from 'react';

import { StyleSheet } from 'react-native';

import Toast from 'react-native-toast-message';

import { FontAwesome } from '@expo/vector-icons';

import { observer } from 'mobx-react-lite';

import { sendLogs } from '@/api';
import Button from '@/components/Button';
import { CText } from '@/components/CText';
import { useStores } from '@/hooks';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { FONTS } from '@/types';

const OauthGoogle = () => {
  useState(() => {
    GoogleSignin.configure();
  });

  const { isLoading, oauthGoogleRegister } = useStores(stores => ({
    oauthGoogleRegister: stores.authStore.oauthGoogleRegister,
    isLoading: stores.authStore.isLoading,
  }));

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();

      await oauthGoogleRegister({ email: user.email, username: user.name });
    } catch (e) {
      sendLogs(e);
      Toast.show({
        type: 'error',
        text1: e.message,
      });
    }
  };

  return (
    <Button
      high
      solid
      onPress={signIn}
      style={styles.container}
      isLoading={isLoading}
    >
      <FontAwesome name="google" size={28} color="white" />
      <CText style={styles.text}>Sign in with Google</CText>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    marginLeft: 10,
    fontFamily: FONTS.OpenSansSemiBold,
  },
});

export default observer(OauthGoogle);
