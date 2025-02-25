import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthRequest } from '../interfaces/auth-request';

export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest<AuthRequest>();

    if (!user) throw new UnauthorizedException('Unauthorized');

    return data ? user[data] : user;
  },
);
