import { createContext, useContext } from 'react';
import { RootStore, stores } from '@/mobx/RootStore';

const StoreContext = createContext<RootStore>({});

export const StoreProvider = ({ children }) => {
  const rootStore = new RootStore();

  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStores = (selector: (rootStore: any) => any) => {
  return selector(useContext(StoreContext));
};
