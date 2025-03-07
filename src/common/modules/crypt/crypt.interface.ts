export interface ICryptService {
  hash(plain: string): Promise<string>;

  verify(hash: string, plain: string): Promise<boolean>;
}

export const CRYPT_SERVICE = Symbol('CRYPT_SERVICE');
