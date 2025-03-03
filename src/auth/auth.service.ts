import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { EncryptionService } from 'src/common/modules/crypt/encryption.service';
import { EventService } from 'src/common/modules/event/event.service';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { AUTH_EVENT } from './auth.listener';
import { CreateSignUpDto } from './dtos/create-sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly crypt: EncryptionService,
    private readonly event: EventService,
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

  async signup(data: CreateSignUpDto) {
    const userCreated = await this.prisma.user.create({ data });

    this.event.emit(AUTH_EVENT.SIGNUP, userCreated.id, data);

    return userCreated;
  }
}
