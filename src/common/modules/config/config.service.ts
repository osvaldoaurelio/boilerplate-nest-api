import { ConfigService as NestConfigService } from '@nestjs/config';

export class ConfigService<
  K = Record<string, unknown>,
> extends NestConfigService<K, true> {}
