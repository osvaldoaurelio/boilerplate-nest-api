import { Module } from '@nestjs/common';
import { CryptModule } from 'src/common/modules/crypt/crypt.module';
import { JwtConfigModule } from 'src/common/modules/jwt-config/jwt-config.module';
import { AuthController } from './auth.controller';
import { AuthListener } from './auth.listener';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [CryptModule, JwtConfigModule],
  controllers: [AuthController],
  providers: [AuthListener, AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
