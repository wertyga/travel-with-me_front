import { store } from '@/app/store/create-isomorphic-store';

import { locationSlice, onStartWatchingLocation } from './location.reducer';
import { Guide } from '@/types';

export const onStopWatchLocation = () => {
  store.dispatch(locationSlice.actions.onStopWatchLocation());
};

export const onStartWatchingAction = (guide: Guide) => {
  store.dispatch(onStartWatchingLocation(guide));
};
