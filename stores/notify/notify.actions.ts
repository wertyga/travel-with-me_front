import { showNotification } from './notify.utils';
import { NearestPoint } from '@/stores/guide/guide.utils';

export const showPointDistanceNotification = async (
  nearestPoint: NearestPoint,
  data?: any
) => {
  const {
    point: { title, _id },
    distance,
  } = nearestPoint;

  showNotification({
    identifier: _id,
    content: {
      title: title,
      body: `${+distance.toFixed(2)} km`,
      sound: false,
      data,
    },
  });
};
