import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext<{
  height: number;
  setHeight: (height: number) => void;
}>({
  height: 0,
  setHeight: () => {},
});

export const LayoutProvider = ({ children }) => {
  const [state, setState] = useState({
    height: 0,
  });

  const setHeight = (height: number) => {
    setState(prev => ({ ...prev, height: Math.round(height) }));
  };

  return (
    <LayoutContext.Provider value={{ height: state.height, setHeight }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
