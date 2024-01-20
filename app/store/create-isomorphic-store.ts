import { createStore } from './create-store';
import { rootReducer } from './root-reducer';
import { middlewares } from './middlewares';

export const store = createStore(rootReducer, middlewares);
