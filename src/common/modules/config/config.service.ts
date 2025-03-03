import { ConfigService as NestConfigService } from '@nestjs/config';

type ConfigMap = Record<string, unknown>;

export class ConfigService<K = ConfigMap> extends NestConfigService<K, true> {}
