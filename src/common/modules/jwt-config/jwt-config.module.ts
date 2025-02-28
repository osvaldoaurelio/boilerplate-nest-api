import { Module } from '@nestjs/common';
import { JwtConfigService } from './jwt-config.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.registerAsync({ useClass: JwtConfigService })],
  providers: [JwtConfigService],
  exports: [JwtModule],
})
export class JwtConfigModule {}
