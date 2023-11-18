import { AxiosRequestConfig } from 'axios';
import { storage } from '@/utils';
import { baseInstance } from './base-instance';

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

    const data = await baseInstance.request({
      headers: {
        ...authHeader,
        ...headers,
      },
      ...config,
    } as AxiosRequestConfig);

    return { data: data?.data } as any;
  } catch (e: any) {
    return {
      error: e.response?.data || { message: e.message },
    };
  }
};
