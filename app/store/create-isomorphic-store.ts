import { createStore } from './create-store';
import { middlewares } from './middlewares';
import { rootReducer } from './root-reducer';

export const store = createStore(rootReducer, middlewares);
