import { ArgumentsHost } from '@nestjs/common';
import { AuthRequest } from 'src/auth/interfaces/auth-request';

export function getRequestInfo(host: ArgumentsHost) {
  const { method, url, user } = host.switchToHttp().getRequest<AuthRequest>();

  return `${method} at ${url} by ${user?.id ?? 'User not logged in'}`;
}
