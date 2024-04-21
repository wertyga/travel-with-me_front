import axios from 'axios';
import Constants from 'expo-constants';

export const baseInstance = axios.create({
  baseURL: Constants.expoConfig?.extra?.API_BASE_URL,
});
