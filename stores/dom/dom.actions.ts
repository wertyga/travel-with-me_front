import { DomStore } from '@/types';
import { store } from '@/app/store/create-isomorphic-store';
import { domSlice } from '@/stores/dom/dom.reducer';

export const updateDomAction = (state: DomStore) => {
  store.dispatch(domSlice.actions.updateState(state));
};

export const dropDomStateAction = () => {
  store.dispatch(domSlice.actions.dropState());
};
