import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { EncryptionService } from './encryption.service';

@Injectable()
export class Argon2Service implements EncryptionService {
  hash(plain: string, options?: argon2.Options) {
    return argon2.hash(plain, options);
  }

  verify(hash: string, plain: string, options?: argon2.Options) {
    return argon2.verify(hash, plain, options);
  }
}
