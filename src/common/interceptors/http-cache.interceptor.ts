import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext } from '@nestjs/common';
import { AuthRequest } from 'src/auth/interfaces/auth-request';
import { getCacheKey } from '../utils/cache-key.utils';

export class httpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    if (request.method !== 'GET' || !request.user) {
      return super.trackBy(context);
    }

    return getCacheKey(request.url, request.user) ?? super.trackBy(context);
  }
}
