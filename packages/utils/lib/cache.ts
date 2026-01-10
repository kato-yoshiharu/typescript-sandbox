export const cache = <T>(load: () => Promise<T>) => (() => {
  let cached: T | null = null;

  return async () => {
    if (cached == null) {
      cached = await load();
    }
    return cached;
  };
})();
