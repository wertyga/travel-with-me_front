import axios from 'axios';
import Constants from 'expo-constants';

export const logger = async (data: any) => {
  if (!Constants.expoConfig?.extra?.API_BASE_URL) return;

  return axios({
    method: 'post',
    url: `${Constants.expoConfig.extra.API_BASE_URL}/logs`,
    data,
  });
};
