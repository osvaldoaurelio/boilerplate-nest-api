import { Injectable, PipeTransform } from '@nestjs/common';
import { EncryptionService } from 'src/common/modules/crypt/encryption.service';
import { CreateSignUpDto } from '../dtos/create-sign-up.dto';

@Injectable()
export class HashUserPasswordPipe implements PipeTransform {
  constructor(private readonly crypt: EncryptionService) {}

  async transform(value: CreateSignUpDto) {
    return {
      ...value,
      password: await this.crypt.hash(value.password),
    };
  }
}
