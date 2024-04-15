import { showNotification } from './notify.utils';
import { NearestPoint } from '@/stores/guide/guide.utils';

export const showPointDistanceNotification = async (
  nearestPoint: NearestPoint,
  data?: any
) => {
  const {
    point: { title, _id },
    distance,
    becameVisible,
  } = nearestPoint;

  showNotification({
    identifier: _id,
    content: {
      title: title,
      body: `${+distance.toFixed(2)} km`,
      subtitle: becameVisible ? 'You reached the place' : undefined,
      sound: !!becameVisible,
      data,
    },
  });
};
