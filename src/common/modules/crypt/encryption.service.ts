export abstract class EncryptionService {
  abstract hash(plain: string): Promise<string>;

  abstract verify(hash: string, plain: string): Promise<boolean>;
}
