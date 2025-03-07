import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import {
  CRYPT_SERVICE,
  ICryptService,
} from 'src/common/modules/crypt/crypt.interface';
import { EventService } from 'src/common/modules/event/event.service';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { AUTH_EVENT } from './auth.listener';
import { CreateSignUpDto } from './dtos/create-sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CRYPT_SERVICE) private readonly crypt: ICryptService,
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

  async confirmEmail(id: string) {
    const userUpdated = await this.prisma.user.update({
      where: { id },
      data: { isActive: true },
    });

    return `Email confirmed for ${userUpdated.email}`;
  }
}
