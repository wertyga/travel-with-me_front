import { AppStateStore } from '@/mobx/stores';

export const getIsNetConnected = () => {
  return AppStateStore.isNetConnected;
};
