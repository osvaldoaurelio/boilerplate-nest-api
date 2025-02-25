import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { envValidate } from './helpers/env-validate';
import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [NestConfigModule.forRoot({ validate: envValidate })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
