import { Inject, Injectable, PipeTransform } from '@nestjs/common';
import {
  CRYPT_SERVICE,
  ICryptService,
} from 'src/common/modules/crypt/crypt.interface';
import { CreateSignUpDto } from '../dtos/create-sign-up.dto';

@Injectable()
export class HashUserPasswordPipe implements PipeTransform {
  constructor(@Inject(CRYPT_SERVICE) private readonly crypt: ICryptService) {}

  async transform(value: CreateSignUpDto) {
    return {
      ...value,
      password: await this.crypt.hash(value.password),
    };
  }
}
