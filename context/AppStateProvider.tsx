import { createContext, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useDispatch } from 'react-redux';
import { baseApi } from '@/app/query';
import { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext';
import { SCREENS } from '@/types';

const AppStateProviderContext = createContext({});

type Props = {
  navigator: NavigationContainerRefWithCurrent<any>;
};

export const AppStateProvider = ({ navigator }: Props) => {
  const currentRoute = useRef({
    routeName: SCREENS.CitiesList,
    routeParams: undefined as any,
  });
  const { setBackScreenData } = useAuth();
  const dispatch = useDispatch();

  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      dispatch(baseApi.util.resetApiState());
      setBackScreenData({
        href: currentRoute.current.routeName,
        params: currentRoute.current.routeParams,
      });
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    navigator.addListener('state', e => {
      const rootState = navigator.getRootState();
      const { name, params } = rootState.routes[rootState.routes.length - 1];
      currentRoute.current = {
        routeName: name as SCREENS,
        routeParams: params,
      };
    });
  }, []);

  return <AppStateProviderContext.Provider value={{}} />;
};
