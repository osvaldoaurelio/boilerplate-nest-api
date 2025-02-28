import { Module } from '@nestjs/common';
import { CryptModule } from 'src/common/modules/crypt/crypt.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtConfigModule } from 'src/common/modules/jwt-config/jwt-config.module';

@Module({
  imports: [JwtConfigModule, CryptModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
