import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Scope,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '../config/config.service';

@Injectable({ scope: Scope.DEFAULT })
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly config: ConfigService) {
    super({
      errorFormat:
        config.get('NODE_ENV') === 'production' ? 'minimal' : 'pretty',
      log:
        config.get('NODE_ENV') === 'production'
          ? ['warn']
          : ['query', 'info', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
