import * as argon2 from 'argon2';

export abstract class EncryptionService {
  abstract hash(plain: string, options?: argon2.Options): Promise<string>;
  abstract verify(
    hash: string,
    plain: string,
    options?: argon2.Options,
  ): Promise<boolean>;
}
