import { openGoogleMap } from '@/components/Map/Map.utils';

import { IDENTIFIERS, showNotification } from '@/utils';

import { Place } from '@/types';

import { CONSTANTS } from '@/styles/constants';

export const gotoPointDirection = async (point: Place) => {
  await showNotification({
    identifier: IDENTIFIERS.pointDirection,
    content: {
      title: point.title,
      color: CONSTANTS.colors.bgLight,
    },
  });

  openGoogleMap(point.coords);
};
