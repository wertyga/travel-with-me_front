import { createContext, useContext, useRef, useState } from 'react';
import { startWatchToLiveLocation } from '@/utils/map';
import { Path } from '@/types';

const PlayGuideContext = createContext<{
  onPlay: () => void;
  onStop: () => void;
  togglePlay: () => void;
  currentLocation?: Path;
  isWatching?: boolean;
}>({
  onPlay: () => {},
  onStop: () => {},
  togglePlay: () => {},
  isWatching: false,
});

export const PlayGuideProvider = ({ children }) => {
  const location = useRef<any>(null);
  const [state, setState] = useState<{
    currentLocation?: Path;
    isWatching: boolean;
  }>({
    currentLocation: undefined,
    isWatching: false,
  });

  const watchCallback = (coords: Path) => {
    setState(prev => ({ ...prev, currentLocation: coords }));
  };

  const onPlay = async () => {
    if (location.current) return;

    location.current = await startWatchToLiveLocation(watchCallback);
    setState(prev => ({ ...prev, isWatching: true }));
  };

  const onStop = () => {
    location.current?.remove();
    location.current = null;
    setState(prev => ({
      ...prev,
      isWatching: false,
      currentLocation: undefined,
    }));
  };

  const togglePlay = () => {
    if (state.isWatching) {
      return onStop();
    }

    return onPlay();
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
