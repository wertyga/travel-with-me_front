import { store } from '@/app/store/create-isomorphic-store';
import { Guide } from '@/types';
import { locationSlice, onStartWatchingLocation } from './location.reducer';

export const onStopWatchLocation = () => {
  store.dispatch(locationSlice.actions.onStopWatchLocation());
};

export const onStartWatchingLocationAction = (guide: Guide) => {
  store.dispatch(onStartWatchingLocation(guide));
};
