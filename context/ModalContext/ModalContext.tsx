import React, { createContext, useCallback, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  SlideInDown,
  SlideOutUp,
  runOnJS,
} from 'react-native-reanimated';

import { ShowToSlideTop } from '@/components/Common';

export type StateType = {
  content: React.ReactNode;
  isShown: boolean;
};

export type ModalContextStateType = Record<string, StateType> | {};

export type ModalContextType = {
  updateState: (id: string, state: StateType) => void;
  toggleShow: (id: string) => void;
  dropContent: (id: string) => void;
  createModal: (id: string, content: React.ReactNode) => void;
  dropState: () => void;
  state: ModalContextStateType;
};

export const ModalContext = createContext<ModalContextType>({
  updateState: () => {},
  toggleShow: () => {},
  dropState: () => {},
  createModal: () => {},
  dropContent: () => {},
  state: {},
});

type Props = {
  children: React.ReactNode;
};

const DEFAULT_STATE: ModalContextStateType = {};

export const ModalProvider = ({ children }: Props) => {
  const [state, setState] = useState<ModalContextStateType>(DEFAULT_STATE);

  const showingModal = Object.entries(state).find(
    ([id, { isShown }]) => isShown
  );

  const updateState = useCallback((id: string, state: Partial<StateType>) => {
    setState(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), ...state },
    }));
  }, []);

  const toggleShow = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), isShown: !prev[id]?.isShown },
    }));
  }, []);

  const closeCurrentShowingModal = () => {
    if (!showingModal) return;

    setState(prev => {
      return {
        ...prev,
        [showingModal[0]]: {
          ...showingModal[1],
          isShown: false,
        },
      };
    });
  };

  const dropState = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  const dropContent = useCallback(id => {
    setState(prev => {
      delete prev[id];

      return { ...prev };
    });
  }, []);

  const createModal = useCallback((id: string, content: React.ReactNode) => {
    setState(prev => ({ ...prev, [id]: { isShown: false, content } }));
  }, []);

  const gesture = Gesture.Fling()
    .direction(Directions.UP)
    .onEnd(() => {
      runOnJS(closeCurrentShowingModal)();
    });

  const ModalContent = showingModal?.[1]?.content;

  return (
    <ModalContext.Provider
      value={{
        toggleShow,
        dropState,
        updateState,
        createModal,
        state,
        dropContent,
      }}
    >
      {children}
      {!!ModalContent && (
        <GestureHandlerRootView style={styles.container}>
          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[StyleSheet.absoluteFillObject, styles.content]}
              exiting={SlideOutUp.duration(100)}
              entering={SlideInDown.duration(100)}
            >
              {ModalContent}

              <ShowToSlideTop size={20} style={styles.showToTop} />
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  showToTop: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    zIndex: 301,
  },
});
