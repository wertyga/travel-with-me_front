import { SCREENS } from '@/types';
import { store } from '@/app/store/create-isomorphic-store';
import { appStateSlice } from '@/stores/appState/appState.reducer';
import { baseApi } from '@/app/query';
import { removeAllNotification } from '@/stores/notify/notify.utils';
import { stopWatchingBackgroundLocation } from '@/utils';
import * as Notifications from 'expo-notifications';

export const updateCurrentRoute = (route: Record<SCREENS, any>) => {
  store.dispatch(appStateSlice.actions.updateCurrentRoute(route));
};

export const setBackScreenData = (route: SCREENS | null, params?: any) => {
  if (!route) {
    store.dispatch(appStateSlice.actions.setBackScreen(null));
    return;
  }

  store.dispatch(appStateSlice.actions.setBackScreen({ [route]: params }));
};

export const updateAppStateListener = async (nextState: string) => {
  if (nextState === 'background') {
    store.dispatch(baseApi.util.resetApiState());
    const {
      appStateStore: { currentRoute },
    } = store.getState();

    if (currentRoute) {
      const [routeName, routeParams] = Object.entries(currentRoute)[0];
      setBackScreenData(routeName as SCREENS, routeParams);
    }
  }

  if (nextState === 'active') {
    await stopWatchingBackgroundLocation();
    await removeAllNotification();

    await Notifications.getPresentedNotificationsAsync();
  }
};
