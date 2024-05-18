import {
  EnhancedStore,
  Middleware,
  Reducer,
  configureStore,
} from '@reduxjs/toolkit';

export const createStore = (
  reducer: Reducer,
  middlewares: ReadonlyArray<Middleware>
): EnhancedStore => {
  return configureStore({
    reducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: false,
      }).concat([...middlewares]);
    },
  });
};
