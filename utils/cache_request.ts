import { AppStateStore } from '@/mobx/stores/AppStateStore';
import { runInAction } from 'mobx';

const DEFAULT_CACHE_TIME = 86400000; // 24h
export type TCacheOptions = Partial<{
  expireIn: number;
}>;

export class CacheReq {
  private static cache = new Map<string, Record<'data' | 'expiredAt', any>>();

  static getCacheKey(fetchName: string, params?: any) {
    return params ? `${fetchName}_${JSON.stringify(params)}` : fetchName;
  }

  static getCache(reqName: string, params?: any) {
    return CacheReq.getCacheByKey(CacheReq.getCacheKey(reqName, params));
  }

  static getCacheByKey(key: string) {
    const cachedData = CacheReq.cache.get(key);
    if (!cachedData) {
      return null;
    }

    const isExpired = cachedData.expiredAt < new Date().getTime();
    if (isExpired) {
      CacheReq.cache.delete(key);

      return null;
    }

    return cachedData.data;
  }

  static setCache(reqName: string, data: any, params?: any) {
    return CacheReq.setCacheByKey(CacheReq.getCacheKey(reqName, params), data);
  }

  static setCacheByKey(key: string, data: any, options: TCacheOptions = {}) {
    const cacheTimeActual = !Number.isNaN(Number(AppStateStore.ENV?.cacheTime))
      ? AppStateStore.ENV?.cacheTime
      : (options.expireIn ?? DEFAULT_CACHE_TIME);

    return CacheReq.cache.set(key, {
      data,
      expiredAt: new Date().getTime() + Number(cacheTimeActual),
    });
  }

  static drop(key: string) {
    this.cache.delete(key);
  }

  static dropAll() {
    this.cache.clear();
  }
}

class CacheHandler {
  key: string;
  loadingKey: string;

  constructor(
    private _parent: any,
    private _promise: (...params: any) => Promise<any>,
    private _params?: any,
    private _options?: TCacheOptions
  ) {
    this.key = CacheReq.getCacheKey(_promise.name, _params);
  }

  withLoading(loadingKey = 'isLoading') {
    this.loadingKey = loadingKey;

    return this;
  }

  async invoke() {
    const cachedResult = CacheReq.getCacheByKey(this.key);

    if (cachedResult) {
      return cachedResult;
    }

    try {
      if (this.loadingKey) {
        runInAction(() => {
          this._parent[this.loadingKey] = true;
        });
      }

      const params = Array.isArray(this._params)
        ? this._params
        : [this._params];
      const result = await this._promise(...params);

      CacheReq.setCacheByKey(this.key, result, this._options);

      if (this.loadingKey) {
        runInAction(() => {
          this._parent[this.loadingKey] = false;
        });
      }

      return result;
    } catch (e) {
      throw e;
    } finally {
      if (this.loadingKey) {
        runInAction(() => {
          this._parent[this.loadingKey] = false;
        });
      }
    }
  }
}

export function cacheWrap(
  promise: (params?: any) => Promise<any>,
  params?: any,
  options?: TCacheOptions
) {
  const handler = new CacheHandler(this, promise, params, options);

  return handler;
}
