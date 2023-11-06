import { AxiosRequestConfig } from 'axios';
// import { toast } from 'react-toastify';
// import { cookies } from '@zoppa/storage/cookie';
import { baseInstance } from './base-instance';

export const baseQuery = async ({
  headers,
  silentError,
  ...config
}: AxiosRequestConfig & { silentError?: boolean }) => {
  try {
    // const token = cookies.get('token');
    const authHeader: AxiosRequestConfig['headers'] = {};
    // if (token) {
    //   authHeader['Authorization'] = `Bearer ${token}`;
    // }
    const data = await baseInstance.request({
      headers: {
        ...authHeader,
        ...headers,
      },
      ...config,
    } as AxiosRequestConfig);

    return { data: data?.data } as any;
  } catch (e: any) {
    if (typeof window !== 'undefined' && !silentError) {
      const errorMessage = e.response?.data?.message || e.message;
      // toast.error(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
    }
    return {
      error: e.response?.data || { message: e.message },
    };
  }
};
