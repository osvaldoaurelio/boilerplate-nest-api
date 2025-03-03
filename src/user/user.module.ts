import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserListener } from './user.listener';

@Module({
  controllers: [UserController],
  providers: [UserService, UserListener],
})
export class UserModule {}
