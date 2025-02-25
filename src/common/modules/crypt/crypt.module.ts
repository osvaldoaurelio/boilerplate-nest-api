import { Module } from '@nestjs/common';
import { Argon2Service } from './argon2.service';
import { EncryptionService } from './encryption.service';

@Module({
  providers: [{ provide: EncryptionService, useClass: Argon2Service }],
  exports: [EncryptionService],
})
export class CryptModule {}
