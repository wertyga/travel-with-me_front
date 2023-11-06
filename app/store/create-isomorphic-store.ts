import { createStore } from './create-store';
import { rootReducer } from './root-reducer';
import { middlewares } from './middlewares';

export const store = createStore(rootReducer, middlewares);

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// export const nextWrapper = createWrapper<AppStore>(makeStore, {
//   // debug: process.env.NODE_ENV !== 'production',
// });
