import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserListener } from './user.listener';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserListener],
})
export class UserModule {}
