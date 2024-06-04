import { createSlice } from '@reduxjs/toolkit';
import { GuideStore } from '@/types';
import { dropNearestPoint, getTheNearestVisiblePoint } from './guide.utils';

const INITIAL_STATE: GuideStore = {
  visiblePoint: undefined,
  nearestPoint: undefined,
  _followingGuide: undefined,
  isGuideMuted: true,
  isFollowingToGuide: false,
};

export const guideSlice = createSlice({
  name: 'guideStore',
  initialState: INITIAL_STATE,
  reducers: {
    updateVisiblePoint(state, { payload }) {
      state.visiblePoint = payload;
    },
    dropState(state) {
      dropNearestPoint();

      return {
        ...state,
        ...INITIAL_STATE,
      };
    },
    changeMuteGuide(state, { payload }) {
      state.isGuideMuted = payload;
    },
    updateFollowingGuide(state, { payload }) {
      state.isFollowingToGuide = payload;
    },
    updateGuidePointWithLiveCoords(state, { payload }) {
      if (state._followingGuide?._id !== payload.guide._id) {
        state._followingGuide = payload.guide;
      }

      if (!state.isFollowingToGuide) {
        dropNearestPoint();
        return;
      }

      const { guide, liveCoords } = payload;

      state.nearestPoint = getTheNearestVisiblePoint(guide.points, liveCoords);

      if (state.nearestPoint.becameVisible) {
        state.visiblePoint = state.nearestPoint.point;
      } else if (state.nearestPoint.becameVisible === false) {
        state.visiblePoint = undefined;
      }
    },
  },
});
