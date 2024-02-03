import { createContext, useContext, useState } from 'react';
import { StyleProps } from 'react-native-reanimated';

const LayoutContext = createContext<{
  height: number;
  footerStyles: StyleProps;
  headerStyles: StyleProps;
  setHeight: (height: number) => void;
  updateStyles: (
    payload: Record<'footerStyles' | 'headerStyles', StyleProps>
  ) => void;
  dropStyles: () => void;
}>({
  height: 0,
  footerStyles: {},
  headerStyles: {},
  setHeight: () => {},
  dropStyles: () => {},
  updateStyles: () => {},
});

export const LayoutProvider = ({ children }) => {
  const [state, setState] = useState({
    height: 0,
    footerStyles: {},
    headerStyles: {},
  });

  const setHeight = (height: number) => {
    setState(prev => ({ ...prev, height: Math.round(height) }));
  };

  const updateStyles = (
    payload: Record<'footerStyles' | 'headerStyles', StyleProps>
  ) => {
    setState(prev => ({
      ...prev,
      footerStyles: { ...state.footerStyles, ...(payload.footerStyles || {}) },
      headerStyles: { ...state.headerStyles, ...(payload.headerStyles || {}) },
    }));
  };

  const dropStyles = () => {
    setState(prev => ({ ...prev, footerStyles: {}, headerStyles: {} }));
  };

  return (
    <LayoutContext.Provider
      value={{ ...state, setHeight, dropStyles, updateStyles }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
