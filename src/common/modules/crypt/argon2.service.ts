import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { ICryptService } from './crypt.interface';

@Injectable()
export class Argon2Service implements ICryptService {
  hash(plain: string, options?: argon2.Options) {
    return argon2.hash(plain, options);
  }

  verify(hash: string, plain: string, options?: argon2.Options) {
    return argon2.verify(hash, plain, options);
  }
}
