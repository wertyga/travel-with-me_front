import { action, runInAction } from 'mobx';

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
