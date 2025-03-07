import { minutes } from 'src/common/utils/time.utils';
import { ICacheService } from './cache.interface';

export class InMemoryCacheService implements ICacheService {
  private cache = new Map<string, { value: any; ttl?: number }>();

  get(key: string) {
    const cachedValue = this.cache.get(key);

    if (!cachedValue?.ttl) return null;

    if (cachedValue.ttl < Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return cachedValue.value;
  }

  set(key: string, value: unknown, ttl = minutes(5)) {
    this.cache.set(key, { value, ttl: Date.now() + ttl });
  }

  del(key: string) {
    this.cache.delete(key);
  }
}
