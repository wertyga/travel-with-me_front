import { Place } from '@/types';
import { store } from '@/app/store/create-isomorphic-store';

import { guideSlice } from './guide.reducer';

export const updateChosenPointAction = (
  chosenPoint?: Place,
  choosePointType = 'manual'
) => {
  store.dispatch(
    guideSlice.actions.updateChosenPoint({
      chosenPoint,
      choosePointType,
    })
  );
};

export const dropGuideStoreStateAction = () => {
  store.dispatch(guideSlice.actions.dropState());
};
