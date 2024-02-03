import { createSlice } from '@reduxjs/toolkit';
import { DomStore } from '@/types';

const INITIAL_STATE: DomStore = {};

export const domSlice = createSlice({
  name: 'domStore',
  initialState: INITIAL_STATE,
  reducers: {
    dropState(state) {
      state = INITIAL_STATE;
    },
    updateState(state, { payload }) {
      return {
        ...state,
        footer: { ...state.footer, ...(payload.footer || {}) },
        header: { ...state.header, ...(payload.header || {}) },
        layout: { ...state.layout, ...payload.layout },
      };
    },
  },
});
