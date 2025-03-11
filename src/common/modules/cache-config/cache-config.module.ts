import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { CacheConfigService } from './cache-config.service';

@Global()
@Module({
  imports: [CacheModule.registerAsync({ useClass: CacheConfigService })],
  providers: [CacheConfigService],
  exports: [CacheModule],
})
export class CacheConfigModule {}
