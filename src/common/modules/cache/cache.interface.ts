export interface ICacheService<T = unknown> {
  get(key: string): Promise<T | null> | T | null;
  set(key: string, value: T, ttl?: number): Promise<void> | void;
  del(key: string): Promise<void> | void;
}

export const CACHE_SERVICE = Symbol('CACHE_SERVICE');
