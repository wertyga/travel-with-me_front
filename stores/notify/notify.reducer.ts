import * as Notifications from 'expo-notifications';
import { createSlice } from '@reduxjs/toolkit';

export enum Notification_Channels {
  POINT_DISTANCE = 'POINT_DISTANCE',
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

Notifications.setNotificationChannelAsync(
  Notification_Channels.POINT_DISTANCE,
  {
    name: 'point',
    importance: Notifications.AndroidImportance.DEFAULT,
    enableVibrate: false,
    enableLights: false,
  }
);

const INITIAL_STATE = {};

export const notifySlice = createSlice({
  name: 'notifyStore',
  initialState: INITIAL_STATE,
  reducers: {
    dropState(state) {
      state = INITIAL_STATE;
    },
  },
});
