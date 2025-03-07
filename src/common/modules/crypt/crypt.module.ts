import { Module } from '@nestjs/common';
import { Argon2Service } from './argon2.service';
import { CRYPT_SERVICE } from './crypt.interface';

@Module({
  providers: [{ provide: CRYPT_SERVICE, useClass: Argon2Service }],
  exports: [CRYPT_SERVICE],
})
export class CryptModule {}
