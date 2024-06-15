import { action, runInAction } from 'mobx';
import { CacheReq } from '@/utils';

async function withLoadingHelper(
  originalFetch: () => Promise<any>,
  args?: any
) {
  try {
    this.isLoading = true;
    const result = await originalFetch.apply(this, args);

    return result;
  } finally {
    runInAction(() => {
      this.isLoading = false;
    });
  }
}

export function withLoading(target, propName, descriptor) {
  const originalFetch = descriptor.value;

  descriptor.value = action(async function (...args) {
    try {
      this.isLoading = true;
      const result = await originalFetch.apply(this, args);

      return result;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  });

  return descriptor;
}

export function withLoadingAndCache(target, propName, descriptor) {
  const originalFetch = descriptor.value;

  descriptor.value = action(async function (...args) {
    try {
      const existsCache = CacheReq.getCache(propName, args);
      if (existsCache) return existsCache;

      this.isLoading = true;
      const result = await originalFetch.apply(this, args);

      return result;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  });

  return descriptor;
}
