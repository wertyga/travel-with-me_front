import { createSlice } from '@reduxjs/toolkit';
import { GuideStore } from '@/types';
import { calculateDistance, getNearestPoint } from '@/utils/map';

const INITIAL_STATE: GuideStore = {
  visiblePoint: undefined,
  nearestPoint: undefined,
  _followingGuide: undefined,
  isGuideMuted: true,
  isFollowingToGuide: false,
};

const MIN_CLOSE_DISTANCE = 0.01; // In km

export const guideSlice = createSlice({
  name: 'guideStore',
  initialState: INITIAL_STATE,
  reducers: {
    updateVisiblePoint(state, { payload }) {
      state.visiblePoint = payload;
    },
    dropState(state) {
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

      if (!state.isFollowingToGuide) return;

      const { guide, liveCoords } = payload;

      const nearestPoint = getNearestPoint(guide.points, liveCoords);
      const distanceToNearestPoint = calculateDistance(
        nearestPoint?.coords,
        liveCoords,
        true
      );

      const isNearestPointTheSame =
        nearestPoint?._id === state.nearestPoint?.point._id &&
        state.nearestPoint?.distance.toFixed(2) ===
          (distanceToNearestPoint as number)?.toFixed(2);
      const isVisiblePointTheSame =
        nearestPoint?._id === state.visiblePoint?._id;

      if (!isNearestPointTheSame) {
        state.nearestPoint = {
          point: nearestPoint,
          distance: distanceToNearestPoint,
        };
      }
      if (
        !isVisiblePointTheSame &&
        distanceToNearestPoint <= MIN_CLOSE_DISTANCE // True
        // distanceToNearestPoint >= MIN_CLOSE_DISTANCE // For Test
      ) {
        state.visiblePoint = nearestPoint;
      } else if (
        distanceToNearestPoint > MIN_CLOSE_DISTANCE && // True
        // distanceToNearestPoint <= MIN_CLOSE_DISTANCE && // For Test
        state.visiblePoint
      ) {
        state.visiblePoint = undefined;
      }
    },
  },
});
