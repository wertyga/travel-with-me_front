import { useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { useStores } from '@/hooks';

export const PermissionRequestPopup = () => {
  const { onStartWatchingLocation } = useStores(stores => ({
    onStartWatchingLocation: stores.locationStore.onStartWatchingLocation,
  }));

  useEffect(() => {
    onStartWatchingLocation();
  }, []);

  return null;
};

export default observer(PermissionRequestPopup);
