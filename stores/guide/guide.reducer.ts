import { createSlice } from '@reduxjs/toolkit';
import { GuideStore } from '@/types';
import { calculateDistance, getNearestPoint } from '@/utils/map';

const INITIAL_STATE: GuideStore = {
  choosePointType: 'auto',
  chosenPoint: undefined,
  nearestPoint: undefined,
};

const MIN_CLOSE_DISTANCE = 0.01; // In km

export const guideSlice = createSlice({
  name: 'guideStore',
  initialState: INITIAL_STATE,
  reducers: {
    updateChosenPoint(state, { payload }) {
      return {
        ...state,
        chosenPoint: payload?.chosenPoint,
        choosePointType: payload?.choosePointType,
      };
    },
    dropState(state) {
      return {
        ...state,
        ...INITIAL_STATE,
      };
    },
    updateGuidePointWithLiveCoords(state, { payload }) {
      const { guide, liveCoords } = payload;

      const nearestPoint = getNearestPoint(guide.points, liveCoords);
      const distanceToNearestPoint = calculateDistance(
        nearestPoint?.coords,
        liveCoords,
        true
      );
      const isPointTheSame = nearestPoint?._id === state.chosenPoint?._id;

      if (!isPointTheSame) {
        state.nearestPoint = nearestPoint;
      }
      if (
        !isPointTheSame &&
        distanceToNearestPoint <= MIN_CLOSE_DISTANCE &&
        state.choosePointType === 'auto'
      ) {
        state.chosenPoint = nearestPoint;
      }
    },
  },
});
