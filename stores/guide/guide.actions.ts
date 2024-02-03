import { Place } from '@/types';
import { store } from '@/app/store/create-isomorphic-store';

import { guideSlice } from './guide.reducer';

export const updateVisiblePointAction = (visiblePoint?: Place) => {
  store.dispatch(guideSlice.actions.updateVisiblePoint(visiblePoint));
};

export const dropGuideStoreStateAction = () => {
  store.dispatch(guideSlice.actions.dropState());
};

export const updateFollowingGuideState = (value: boolean) => {
  const {
    guideStore: { _followingGuide, isFollowingToGuide },
    locationStore: { liveCoords },
  } = store.getState();
  store.dispatch(guideSlice.actions.updateFollowingGuide(value));

  // Going to turn on following
  if (!isFollowingToGuide && value && _followingGuide) {
    store.dispatch(
      guideSlice.actions.updateGuidePointWithLiveCoords({
        liveCoords,
        guide: _followingGuide,
      })
    );
  }
};

export const toggleGuideMute = (value?: boolean) => {
  const { guideStore } = store.getState();
  const actualValue =
    typeof value !== 'undefined' ? value : !guideStore.isGuideMuted;

  store.dispatch(guideSlice.actions.changeMuteGuide(actualValue));
};
