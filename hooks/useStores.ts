import { useStores as useRootStore } from '@/mobx/StoreProvider';
import { RootStoreType } from '@/types';

export const useStores = <T>(callback: (stores: RootStoreType) => T): T => {
  return useRootStore<T>(callback);
};
