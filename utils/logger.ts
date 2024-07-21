import Constants from 'expo-constants';

import axios from 'axios';

export const logger = async (data: any) => {
  if (!Constants.expoConfig?.extra?.API_BASE_URL) return;

  return axios({
    method: 'post',
    url: `${Constants.expoConfig.extra.API_BASE_URL}/logs`,
    data,
  });
};

export function initiateConsoleTime() {
  const keys = {};

  console.time = function (key: string) {
    keys[key] = Date.now();
  };

  console.timeEnd = function (key: string) {
    if (!keys[key]) {
      console.error(`No such key - ${key}`);
      return;
    }

    const timeTaken = Date.now() - keys[key];

    console.log(`${key}: ${timeTaken / 1000} s`);
  };
}
