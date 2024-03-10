import { View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context';
import { useOauthGoogleMutation } from '@/api';
import Toast from 'react-native-toast-message';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GOOGLE_URL = 'https://googleapis.com/userinfo/v2/me';

WebBrowser.maybeCompleteAuthSession();

export const OauthGoogle = () => {
  const { setUser } = useAuth();
  const [accessToken, setAccessToken] = useState('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  });

  const [fetchForGoogleUser, { isLoading }] = useOauthGoogleMutation();

  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication?.accessToken || '');
    }
  }, [response]);

  const fetchUserInfo = async () => {
    await promptAsync();
    // if (!accessToken) {
    //   return Toast.show({
    //     type: 'error',
    //     text1: 'Access token was not been provided',
    //   });
    // }
    //
    // const userInfo = await fetchForGoogleUser({ accessToken });
    // setUser(userInfo);
    //
    // console.log({ userInfo });
  };

  return (
    <View>
      <Button
        title="Google oauth"
        disabled={isLoading}
        onPress={fetchUserInfo}
      />
    </View>
  );
};
