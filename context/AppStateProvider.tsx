import { createContext, useContext, useEffect } from 'react';
import { AppState } from 'react-native';
import { useDispatch } from 'react-redux';
import { baseApi } from '@/app/query';

const AppStateProviderContext = createContext({});

export const AppStateProvider = ({ children }) => {
  const dispatch = useDispatch();

  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      dispatch(baseApi.util.resetApiState());
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  return (
    <AppStateProviderContext.Provider value={{}}>
      {children}
    </AppStateProviderContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateProviderContext);
};
