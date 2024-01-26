import { Place } from '@/types';
import { store } from '@/app/store/create-isomorphic-store';

import { guideSlice } from './guide.reducer';

export const updateVisiblePointAction = (visiblePoint?: Place) => {
  store.dispatch(guideSlice.actions.updateVisiblePoint(visiblePoint));
};

export const dropGuideStoreStateAction = () => {
  store.dispatch(guideSlice.actions.dropState());
};

export const toggleGuideMute = (value?: boolean) => {
  const { guideStore } = store.getState();
  const actualValue =
    typeof value !== 'undefined' ? value : !guideStore.isGuideMuted;

  store.dispatch(guideSlice.actions.changeMuteGuide(actualValue));
};
