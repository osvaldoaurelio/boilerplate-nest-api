import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { envValidate } from './helpers/env-validate';

@Global()
@Module({
  imports: [NestConfigModule.forRoot({ validate: envValidate })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
