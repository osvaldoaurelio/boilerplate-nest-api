import { Injectable, PipeTransform } from '@nestjs/common';
import { SignUpDto } from '../dto/sign-up.dto';
import { EncryptionService } from 'src/common/modules/crypt/encryption.service';

@Injectable()
export class HashUserPasswordPipe implements PipeTransform {
  constructor(private readonly crypt: EncryptionService) {}

  async transform(value: SignUpDto) {
    return {
      ...value,
      password: await this.crypt.hash(value.password),
    };
  }
}
