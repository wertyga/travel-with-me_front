import { store } from '@/app/store/create-isomorphic-store';
import { domSlice } from '@/stores/dom/dom.reducer';
import { DomStore } from '@/types';

export const updateDomAction = (state: DomStore) => {
  store.dispatch(domSlice.actions.updateState(state));
};

export const dropDomStateAction = () => {
  store.dispatch(domSlice.actions.dropState());
};
