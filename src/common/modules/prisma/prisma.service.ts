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
    super(
      config.get('NODE_ENV') === 'production'
        ? { errorFormat: 'minimal', log: ['warn'] }
        : { errorFormat: 'pretty', log: ['query', 'info', 'warn'] },
    );
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
