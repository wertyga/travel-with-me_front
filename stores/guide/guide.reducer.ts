import { createSlice } from '@reduxjs/toolkit';
import { calculateDistance, getNearestPoint } from '@/utils/map';
import { GuideStore } from '@/types';
import {
  MIN_CLOSE_DISTANCE,
  dropNearestPoint,
  getTheNearestVisiblePoint,
} from './guide.utils';

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
    updateBackgroundFollowingGuide(state, { payload }) {
      state.isFollowingToGuideInBackground = payload;
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

      // const nearestPoint = getNearestPoint(guide.points, liveCoords);
      // const distanceToNearestPoint = calculateDistance(
      //   nearestPoint?.coords,
      //   liveCoords,
      //   true
      // );
      //
      // const isNearestPointTheSame =
      //   nearestPoint?._id === state.nearestPoint?.point._id &&
      //   state.nearestPoint?.distance.toFixed(2) ===
      //     (distanceToNearestPoint as number)?.toFixed(2);
      // const isVisiblePointTheSame =
      //   nearestPoint?._id === state.visiblePoint?._id;
      //
      // if (!isNearestPointTheSame) {
      //   state.nearestPoint = {
      //     point: nearestPoint,
      //     distance: distanceToNearestPoint,
      //   };
      // }
      // if (
      //   !isVisiblePointTheSame &&
      //   distanceToNearestPoint <= MIN_CLOSE_DISTANCE // True
      //   // distanceToNearestPoint >= MIN_CLOSE_DISTANCE // For Test
      // ) {
      //   state.visiblePoint = nearestPoint;
      // } else if (
      //   distanceToNearestPoint > MIN_CLOSE_DISTANCE && // True
      //   // distanceToNearestPoint <= MIN_CLOSE_DISTANCE && // For Test
      //   state.visiblePoint
      // ) {
      //   state.visiblePoint = undefined;
      // }
    },
  },
});
