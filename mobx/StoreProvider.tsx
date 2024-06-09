import React, { createContext, useContext } from 'react';
import { RootStore } from '@/mobx/RootStore';

const StoreContext = createContext<RootStore>({} as RootStore);

type Props = {
  store: Record<string, any>;
  children: React.ReactNode;
};
export const StoreProvider: React.FC<Props> = ({ children, store }) => {
  const rootStore = new RootStore(store);

  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStores = <T,>(selector: (rootStore: RootStore) => T): T => {
  return selector(useContext(StoreContext));
};
