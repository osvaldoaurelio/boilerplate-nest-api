import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { EncryptionService } from 'src/common/modules/crypt/encryption.service';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly crypt: EncryptionService,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateLocalUser(email: string, password: string) {
    const userFound = await this.prisma.user.findUnique({ where: { email } });
    if (!userFound) throw new UnauthorizedException('Invalid credentials');

    const pwMatched = await this.crypt.verify(userFound.password, password);
    if (!pwMatched) throw new UnauthorizedException('Invalid credentials');

    return userFound;
  }

  login({ id: sub, email, fullName }: User) {
    return this.jwt.signAsync({ sub, email, fullName });
  }

  signup(signUpDto: SignUpDto) {
    return this.prisma.user.create({ data: signUpDto });
  }
}
