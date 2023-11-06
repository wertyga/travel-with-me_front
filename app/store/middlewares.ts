import { baseApi, listenerMiddleware } from '@/app/query';

export const middlewares = [baseApi.middleware, listenerMiddleware.middleware];
