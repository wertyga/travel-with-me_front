import * as Notifications from 'expo-notifications';
import { NotificationRequestInput } from 'expo-notifications/src/Notifications.types';

export const showNotification = async (
  data: Omit<NotificationRequestInput, 'trigger'> & {
    trigger?: NotificationRequestInput['trigger'];
  }
) => {
  const isNotificationAllowed = await checkForNotificationPermission();
  if (!isNotificationAllowed) {
    return;
  }

  const { content = {}, ...restData } = data;
  Notifications.scheduleNotificationAsync({
    trigger: null,
    content: {
      vibrate: [],
      ...content,
    },
    ...restData,
  });
};

const checkForNotificationPermission = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();

    return status === 'granted';
  }

  return existingStatus === 'granted';
};

export const removeAllNotification = async () => {
  await Notifications.dismissAllNotificationsAsync();
};

export const removeNotification = async (id: string) => {
  if (!id) return;

  await Notifications.dismissNotificationAsync(id);
};

export const getNotificationAsync = async (id: string) => {
  const notifications = await Notifications.getPresentedNotificationsAsync();

  return notifications.find(({ request }) => request.identifier === id)
    ?.request;
};
