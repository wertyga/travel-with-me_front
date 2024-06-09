import { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useOauthGoogleMutation } from '@/api';
import { useAuth } from '@/context';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';

const GOOGLE_URL = 'https://googleapis.com/userinfo/v2/me';

WebBrowser.maybeCompleteAuthSession();

export const OauthGoogle = () => {
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
