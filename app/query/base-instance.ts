import axios from 'axios';

export const baseInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});
