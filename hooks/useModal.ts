import { useContext, useEffect, useId } from 'react';

import { ModalContext, StateType } from '@/context/ModalContext/ModalContext';

export const useModal = () => {
  const id = useId();

  const context = useContext(ModalContext);

  useEffect(() => {
    return () => {
      context.dropContent(id);
    };
  }, []);

  return {
    ...context,
    createModal: (content: React.ReactNode) => {
      return context.createModal(id, content);
    },
    toggleShow: () => context.toggleShow(id),
    updateState: (state: StateType) => context.updateState(id, state),
    isShown: !!context.state[id]?.isShown,
  };
};
