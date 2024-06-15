import { runInAction } from 'mobx';

class CacheHandler {
  key: string;
  loadingKey: string;
  _parent: any;

  constructor(
    private promise: (...params: any) => Promise<any>,
    private params?: any
  ) {
    this.key = CacheReq.getCacheKey(promise.name, params);
  }

  withLoading(parent: any, loadingKey = 'isLoading') {
    this.loadingKey = loadingKey;
    this._parent = parent;

    return this;
  }

  async invoke() {
    const cachedResult = CacheReq.getCache(this.key);
    if (cachedResult) {
      return cachedResult;
    }

    try {
      if (this.loadingKey) {
        runInAction(() => {
          this._parent[this.loadingKey] = true;
        });
      }

      const params = Array.isArray(this.params) ? this.params : [this.params];
      const result = await this.promise(...params);

      CacheReq.setCache(this.key, result);

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

export class CacheReq {
  private static cache = new Map();

  static getCacheKey(fetchName: string, params?: any) {
    return params ? `${fetchName}_${JSON.stringify(params)}` : fetchName;
  }

  static getCache(reqName: string, params?: any) {
    return CacheReq.cache.get(CacheReq.getCacheKey(reqName, params));
  }

  static setCache(reqName: string, data: any, params?: any) {
    return CacheReq.cache.set(CacheReq.getCacheKey(reqName, params), data);
  }

  static wrap(promise: (params?: any) => Promise<any>, params?: any) {
    const handler = new CacheHandler(promise, params);

    return handler;
  }

  static drop(key: string) {
    this.cache.delete(key);
  }

  static dropAll() {
    this.cache.clear();
  }
}
