import { AxiosRequestConfig } from 'axios';
import Toast from 'react-native-toast-message';
import { storage } from '@/utils';
import Constants from 'expo-constants';
import axios from 'axios/index';

export const baseQuery = async ({
  headers,
  silentError,
  ...config
}: AxiosRequestConfig & { silentError?: boolean }) => {
  try {
    const token = await storage.get('token');
    const authHeader: AxiosRequestConfig['headers'] = {};
    if (token) {
      authHeader['Authorization'] = `Bearer ${token}`;
    }
    const data = await axios.request({
      headers: {
        ...authHeader,
        ...headers,
      },
      baseURL: Constants.expoConfig?.extra.API_BASE_URL,
      ...config,
    } as AxiosRequestConfig);

    return { data: data?.data } as any;
  } catch (e: any) {
    console.log(e.code, e.response?.code);
    if (!silentError) {
      Toast.show({
        type: 'error',
        text1: e.response?.data.message || e.message,
      });
    }

    return {
      error: e.response?.data || { message: e.message },
    };
  }
};
