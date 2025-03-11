import { User } from '@prisma/client';

export function getCacheKey(url: string, user: User) {
  console.log(url);
  if (url.includes('user/me')) return getUserMeCacheKey(user);
}

export function getUserMeCacheKey({ id }: User) {
  return `user-me::${id}`;
}
