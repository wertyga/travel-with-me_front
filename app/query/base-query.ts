import Toast from 'react-native-toast-message';

import Constants from 'expo-constants';

import { sendLogs } from '@/api';
import axios, { AxiosRequestConfig } from 'axios';

import { storage } from '@/utils';
import { getIsNetConnected } from '@/utils/etc';

export const baseQuery = async (
  {
    headers,
    silentError,
    ...config
  }: AxiosRequestConfig & { silentError?: boolean },
  defaultResponse?: any
) => {
  if (!getIsNetConnected()) return defaultResponse;

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
      baseURL: Constants.expoConfig?.extra?.API_BASE_URL,
      ...config,
    } as AxiosRequestConfig);

    return { data: data?.data } as any;
  } catch (e: any) {
    if (!silentError && e.response?.status !== 403) {
      Toast.show({
        type: 'error',
        text1: e.response?.data.message || e.message,
      });
    }

    throw e;
  }
};
