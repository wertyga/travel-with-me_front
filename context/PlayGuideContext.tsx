import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import {
  calculateDistance,
  getNearestPoint,
  startWatchToLiveLocation,
} from '@/utils/map';
import { Guide, Path, Place, SCREENS } from '@/types';
import { useNavigation } from '@react-navigation/native';

const PlayGuideContext = createContext<{
  onPlay: (guide: Guide) => void;
  onStop: () => void;
  togglePlay: (guide: Guide) => void;
  currentLocation?: Path;
  isWatching?: boolean;
}>({
  onPlay: () => {},
  onStop: () => {},
  togglePlay: () => {},
  isWatching: false,
});

const MIN_DISTANCE_TO_POINT = 0.01; // 10m

export const PlayGuideProvider = ({ children }) => {
  const navi = useNavigation();
  const location = useRef<any>(null);
  const currentGuide = useRef<Guide | null>(null);
  const [state, setState] = useState<{
    currentLocation?: Path;
    isWatching: boolean;
  }>({
    currentLocation: undefined,
    isWatching: false,
  });

  const watchCallback = useCallback(
    (coords: Path) => {
      const nearestPoint = getNearestPoint(
        currentGuide.current?.points as Place[],
        coords
      );
      const distanceToNearestPoint = calculateDistance(
        nearestPoint?.coords,
        coords,
        true
      );

      const { name: currentRouteName } = navi.getCurrentRoute();
      const isGuideMapScreen = currentRouteName === SCREENS.GuideMap;
      const isPlaceScreen = currentRouteName === SCREENS.Place;
      console.log({ distanceToNearestPoint, isGuideMapScreen });

      setState(prev => ({ ...prev, currentLocation: coords }));
    },
    [navi]
  );

  const onPlay = async (guide: Guide) => {
    if (location.current) return;

    location.current = await startWatchToLiveLocation(watchCallback);
    currentGuide.current = guide;
    setState(prev => ({ ...prev, isWatching: true }));
  };

  const onStop = () => {
    location.current?.remove();
    location.current = null;
    currentGuide.current = null;
    setState(prev => ({
      ...prev,
      isWatching: false,
      currentLocation: undefined,
    }));
  };

  const togglePlay = (guide: Guide) => {
    if (state.isWatching) {
      return onStop();
    }

    return onPlay(guide);
  };

  return (
    <PlayGuideContext.Provider
      value={{
        onPlay,
        onStop,
        togglePlay,
        currentLocation: state.currentLocation,
        isWatching: state.isWatching,
      }}
    >
      {children}
    </PlayGuideContext.Provider>
  );
};

export const usePlayGuide = () => useContext(PlayGuideContext);
