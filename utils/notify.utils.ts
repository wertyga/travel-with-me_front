import * as Notifications from 'expo-notifications';
import { NotificationRequestInput } from 'expo-notifications/src/Notifications.types';

export const showNotification = async (
  data: Omit<NotificationRequestInput, 'trigger'> & {
    trigger?: NotificationRequestInput['trigger'];
  }
) => {
  Notifications.scheduleNotificationAsync({
    trigger: null,
    content: {
      vibrate: false,
      ...(data.content || {}),
    },
    ...data,
  });
};

export const removeAllNotification = async () => {
  await Notifications.dismissAllNotificationsAsync();
};

export const removeNotification = async (id: string) => {
  await Notifications.dismissNotificationAsync(id);
};

export const getNotificationAsync = async (id: string) => {
  const notifications = await Notifications.getPresentedNotificationsAsync();

  return notifications.find(({ request }) => request.identifier === id)
    ?.request;
};
