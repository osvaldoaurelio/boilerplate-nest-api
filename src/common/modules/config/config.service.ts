import { ConfigService as NestConfigService } from '@nestjs/config';
import { ConfigMap } from './config.type';

export class ConfigService<K = ConfigMap> extends NestConfigService<K, true> {}
